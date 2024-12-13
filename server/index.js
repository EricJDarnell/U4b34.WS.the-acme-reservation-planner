const {
  client,
  createTables,
  seedTables,
  createCustomer,
  createRestaurant,
  createReservations,
  fetchCustomers,
  fetchRestaurants,
  fetchReservations,
  destroyReservation,
} = require("./db");
const express = require("express");
const app = express();
app.use(express.json());

const init = async () => {
    console.log('connecting to database');
    await client.connect();
    console.log('connected to database');
    await createTables();
    console.log('Created Tables');
    await seedTables();
    console.log('Seeded Tables');
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`listening on port ${port}`));
};
init();