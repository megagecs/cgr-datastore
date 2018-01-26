// Imports the Google Cloud client library
const Datastore = require('@google-cloud/datastore');

// Your Google Cloud Platform project ID
const projectId = 'datastore-quickstart-191515';
//const projectId = 'YOUR_PROJECT_ID';

// Creates a client
const datastore = new Datastore({
  projectId: projectId,
});

//listTasks();
//listTasksWithFilter();
insertTask02();

/*
Insert an Entity
*/
function insertTask()
{
  // The kind for the new entity
  const kind = 'Task';
  // The name/ID for the new entity
  const name = 'sampletask1';
  // The Cloud Datastore key for the new entity
  //const taskKey = datastore.key([kind, name]);

  // key 'undefined' (autogen)
  const taskKey = datastore.key(kind);

  // Prepares the new entity
  // new Date(2018,0,08,14,25,00) --> 2018/01/08T14:25:00
  const task = {
    key: taskKey,
    data: {
      created: new Date(2018,1,09,10,10,00),
      description: 'Entidad 12',
      done:true
    },
  };

  // Saves the entity
  datastore
    .save(task)
    .then(() => {
      console.log(`Saved ${task.key.name}: ${task.data.description}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
} //END insertTask()

function insertTask02()
{
  console.log('insertTask02');
  // The kind for the new entity
  const kind = 'Task';
  // The name/ID for the new entity
  const name = 'sampletask1';
  // The Cloud Datastore key for the new entity
  //const taskKey = datastore.key([kind, name]);

  // key 'undefined' (autogen)
  const taskKey = datastore.key(kind);

  // Prepares the new entity
  // new Date(2018,0,08,14,25,00) --> 2018/01/08T14:25:00
  const task = {
    key: taskKey,
    data: [
      {
        name: 'created',
        value: new Date(2018,1,09,18,50,00),
      },
      {
        name: 'description',
        value: 'otro ejemplo insert',
      },
      {
        name: 'done',
        value: true,
      },
    ],
  };

  // Saves the entity
  datastore
    .save(task)
    .then(() => {
      console.log(`Saved ${task.key.name}: ${task.data.description}`);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
} //END insertTask02()


/*
Running a query
In addition to retrieving entities from Cloud Datastore directly by their keys, an application can perform a query to retrieve them by the values of their properties. A typical query includes the following:

An entity kind to which the query applies
Zero or more filters, for example to select kinds whose properties match a value
Zero or more sort orders, to sequence the results
For this application, we'll query Cloud Datastore for Task entities sorted by creation time:
*/
function listTasks() {
  const query = datastore.createQuery('Task').order('created');

  datastore
    .runQuery(query)
    .then(results => {
      const tasks = results[0];

      console.log('Tasks:');
      tasks.forEach(task => {
        const taskKey = task[datastore.KEY];
        console.log(taskKey.id, task);
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

function listTasksWithFilter() {
  const query = datastore.createQuery('Task');

  /* const dateQuery = query
  .filter('created', '>=', new Date(2018,0,08,10,00,00)); */
  
  const dateQuery02 = query
  .filter('created', '>=', new Date(2018,0,08,10,00,00))
  .filter('created', '<=', new Date(2018,1,08,10,00,00));

  datastore
    .runQuery(query)
    .then(results => {
      const tasks = results[0];

      console.log('Tasks:');
      tasks.forEach(task => {
        const taskKey = task[datastore.KEY];
        console.log(taskKey.id);
        console.log('description:' + task.description);
        console.log('created:'     + task.created);
        console.log('done:'        + task.done);
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}