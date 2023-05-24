const express = require("express");
const PostgreSQL = require("./PostgreSQL.js");

const router = express.Router();

// TEST PURPOSE ONLY
router.get("/test", (req, res) => {
  res.status(200).send({ message: "testing" });
});

router.get("/qa/questions", (req, res) => {
  //Additional params are made through.. '?params1=1&params2=2&params3=3'
  var product_id = req.query.product_id; //string result
  var product_page = req.query.page || 1; // if none will DEFAULT to a NUMBER 1 not STRING
  var product_count = req.query.count || 5; // if none will DEFAULT to a NUMBER 5 not STRING

  PostgreSQL.query(
    // We are not selecting anything, but we are using json_build_object to build out the object, however, we cannot use build object without select tag before it
    //offset
    // This list does not include any 'reported' questions. consider this.  (SELECT to_char(questionData.question_date AT TIME ZONE 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"'))

    /*
        CHANGE THE COLUMN IN QUESTIONS TO TIMESTAMP FOR THE DATE
        ALTER TABLE questions ALTER COLUMN question_date TYPE timestamp USING TO_TIMESTAMP(question_date/1000);
        */
    `SELECT json_build_object(
          'product_id', ${product_id},
          'results',
          COALESCE((WITH questionData AS (SELECT * from questions WHERE product_id = ${product_id} AND reported <> 1 OFFSET ${product_page} LIMIT ${product_count})

            SELECT json_agg(json_build_object(
            'question_id', questionData.question_id,
            'question_body', questionData.question_body,
            'question_date', (SELECT to_char(TO_TIMESTAMP(questionData.question_date/1000), 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')),
            'asker_name', questionData.asker_name,
            'question_helpfulness', questionData.question_helpfulness,
            'reported', CASE questionData.reported WHEN 0 THEN false ELSE true END,

            'answers', COALESCE((SELECT json_object_agg(answers.answer_id, json_build_object(
              'id', answers.answer_id,
              'body', answers.body,
              'date', (SELECT to_char(TO_TIMESTAMP(answers.date/1000), 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')),
              'answerer_name', answers.answerer_name,
              'helpfulness', answers.helpfulness,

              'photos', COALESCE((SELECT json_agg(json_build_object(
                'id', photos.id,
                'url', photos.url
              )) FROM photos WHERE photos.answer_id = answers.answer_id), '[]')

            )) FROM answers WHERE answers.question_id = questionData.question_id), '{}')
            )) FROM questionData
            ), '[]')
          )`,
  )
    .then((data) => {
      if (!data) {
        throw data;
      }
      res.status(200).send(data.rows[0].json_build_object);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

router.get("/qa/questions/:question_id/answers", (req, res) => {
  //PARAMETERS FROM :QUESTION_ID = params: {question_id: '4'}     -> /qa/questions/5/answers  <- THIS IS GOING TO BE IN THE QUESTION_ID IN THE PARAMS OBJECT
  //ANYTHING AFTER THE ENDPOINT SEPERATED BY THE ? w/ reference to a = will be in query / -> ?count=1&page=2

  //helpdesk ask about the pages and etc.

  //PARAMETER that is entered through the endpoint reference
  var question_id = req.params.question_id;

  //QUERY that is after the ? seperated by &
  var page = req.query.page || 1; // WHY IS THIS 0 NORMALLY on glearn
  var count = req.query.count || 5;

  PostgreSQL.query(
    `SELECT json_build_object(
          'question', ${question_id},
          'page', ${page},
          'count', ${count},
          'results', COALESCE((WITH answerData AS (SELECT * FROM answers WHERE question_id = ${question_id} AND reported <> 1 LIMIT ${count})
            SELECT json_agg(json_build_object(
              'answer_id', answerData.answer_id,
              'body', answerData.body,
              'date', (SELECT to_char(TO_TIMESTAMP(answerData.date/1000), 'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"')),
              'answerer_name', answerData.answerer_name,
              'helpfulness', answerData.helpfulness,
              'photos', COALESCE((SELECT json_agg(json_build_object(
                'id', photos.id,
                'url', photos.url
              )) FROM photos WHERE photos.answer_id = answerData.answer_id), '[]')
            )) FROM answerData
          ), '[]')
        )`,
  )
    .then((data) => {
      if (!data) {
        throw data;
      }
      res.status(200).send(data.rows[0].json_build_object);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
});

router.post("/qa/questions", (req, res) => {
  //AERIO front end handles the fact that the body, name, email and product_id has all be filled out before submitting.

  var product_id = Number(req.body.product_id);

  var questionBody = req.body.body;
  //date
  let date = new Date();
  let unixMS = date.getTime();

  const name = req.body.name;
  const email = req.body.email;
  const reported = 0;
  const questionHelp = 0;

  PostgreSQL.query(
    `INSERT INTO questions (product_id, question_body, question_date, asker_name, asker_email, reported, question_helpfulness) VALUES ('${product_id}', '${questionBody}', '${unixMS}', '${name}', '${email}', '${reported}', '${questionHelp}')`,
  )
    .then((data) => {
      if (!data) {
        throw data;
      }
      res.status(201).send(data);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
});

router.post("/qa/questions/:question_id/answers", (req, res) => {
  var question_id = req.params.question_id;
  var { body, name, email } = req.body;
  var photosArray = req.body.photos;

  if (Array.isArray(photosArray) === true) {
    photosArray = JSON.stringify(photosArray);
  }

  let date = new Date();
  let unixMS = date.getTime();
  const reported = 0;
  const helpfulness = 0;

  PostgreSQL.query(
    `WITH answersRef AS (INSERT INTO answers (
      question_id, body, date, answerer_name, answerer_email, reported, helpfulness)
      VALUES ('${question_id}', '${body}', '${unixMS}', '${name}', '${email}', '${reported}', '${helpfulness}')
      RETURNING answer_id)
      INSERT INTO photos (answer_id, url) VALUES ((SELECT answer_id FROM answersRef), json_array_elements_text('${photosArray}'))`,
  )
    .then((data) => {
      if (!data) {
        throw data;
      }
      res.status(201).send(data);
    })
    .catch((error) => {
      res.status(404).send(error);
    });
  /*
  Remember that photos table has answer_id.
  */
});

router.put("/qa/questions/:question_id/helpful", (req, res) => {
  var question_id = req.params.question_id;

  PostgreSQL.query(
    `UPDATE questions SET question_helpfulness = question_helpfulness + 1 WHERE question_id = ${question_id}`,
  )
    .then((data) => {
      if (!data) {
        throw data;
      }
      res.status(204).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.put("/qa/questions/:question_id/report", (req, res) => {
  var question_id = req.params.question_id;

  PostgreSQL.query(
    `UPDATE questions SET reported = 1 WHERE question_id = ${question_id}`,
  )
    .then((data) => {
      if (!data) {
        throw data;
      }
      res.status(204).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.put("/qa/answers/:answer_id/helpful", (req, res) => {
  var answer_id = req.params.answer_id;

  PostgreSQL.query(
    `UPDATE answers SET helpfulness = helpfulness + 1 WHERE answer_id = ${answer_id}`,
  )
    .then((data) => {
      if (!data) {
        throw data;
      }
      res.status(204).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.put("/qa/answers/:answer_id/report", (req, res) => {
  var answer_id = req.params.answer_id;

  PostgreSQL.query(
    `UPDATE answers SET reported = 1 WHERE answer_id = ${answer_id}`,
  )
    .then((data) => {
      if (!data) {
        throw data;
      }
      res.status(204).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = router;
