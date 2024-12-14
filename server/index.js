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

app.get('/api/customers', async (req, res, next) => {
    try {
        res.send(await fetchCustomers());
    } catch (ex) {
        next(ex);
    }
});
app.get('/api/restaurants', async (req, res, next) => {
    try {
        res.send(await fetchRestaurants());
    } catch (ex) {
        next(ex);
    }
});
app.get('/api/reservations', async (req, res, next) => {
    try {
        res.send(await fetchReservations());
    } catch (ex) {
        next(ex);
    }
});
app.delete('/api/customers/:customer_id/reservations/:reservation_id', async (req, res, next) => {
    try {
        await destroyReservation({ id: req.params.id, customer_id: req.params.customer_id });
        res.sendStatus(204);
    } catch (ex) {
        next(ex);
    }
});
app.post('/api/customers', async (req, res, next) => {
    try {
        res.status(201).send(await createCustomer({ name: req.body.name }));
    } catch (ex) {
        next(ex);
    }
});
app.post('/api/restaurants', async (req, res, next) => {
    try {
        res.status(201).send(await createRestaurant({ name: req.body.name }));
    } catch (ex) {
        next(ex);
    }
});
app.post('/api/customers/:customer_id/reservation', async (req, res, next) => {
    try {
        res.status(201).send(await createReservations({ customer_id: req.params.customer_id, restaurant_id: req.body.restaurant_id, party_count: req.body.party_count, date: req.body.date }));
    } catch (ex) {
        next(ex);
    }
});
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