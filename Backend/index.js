import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "adt_finalproject",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/listings", (req, res) => {
  const q = "SELECT l.price, l.vehicle_id, m.MakerName, l.model, l.body_type FROM listing l JOIN makers m ON l.vehicle_id = m.vehicle_id";

  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.get("/listings/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT l.price, l.year, l.vehicle_id, m.MakerName, l.model, l.body_type, l.trim, l.mileage, l.sale_status FROM listing l JOIN makers m ON l.vehicle_id = m.vehicle_id where l.vehicle_id = ?";

  db.query(q,[id], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/listings", (req, res) => {
  const q = "SELECT MAX(vehicle_id) AS max_vehicle_id FROM listing";
  const q1 = "SELECT MAX(maker) AS max_maker FROM listing";
  const q2 = "SELECT MAX(location_id) AS max_loc FROM location";

  // Fetch max values first
  db.query(q, (err, result) => {
    if (err) return res.send(err);

    const maxVehicleId = result[0].max_vehicle_id;

    db.query(q1, (err, result) => {
      if (err) return res.send(err);

      const maxMaker = result[0].max_maker;

      db.query(q2, (err, result) => {
        if (err) return res.send(err);
  
        const maxLoc = result[0].max_loc;  

      // Now, use placeholders for the INSERT query
      const insertQuery =
        "INSERT INTO listing (vehicle_id, maker, model, price, year, body_type, sale_status, mileage, trim) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

      const values = [
        maxVehicleId + 1, // Incrementing the max vehicle_id for the new entry
        maxMaker + 1, // This might not be what you want, consider a different approach
        req.body.model,
        req.body.price,
        req.body.year,
        req.body.body_type,
        req.body.sale_status,
        req.body.mileage,
        req.body.trim,
      ];

      db.query(insertQuery, values, (err, listingData) => {
        if (err) return res.send(err);

        const insertLocationQuery =
          "INSERT INTO location (addressLine1, city, stateAbbreviation, zip5, location_id, vehicle_id) VALUES (?, ?, ?, ?, ?, ?)";

          const locValues = [
            req.body.addressLine1,
            req.body.city,
            req.body.stateAbbreviation,
            req.body.zip5,
            maxLoc + 1,
            maxVehicleId + 1, 
          ];
    
          db.query(insertLocationQuery, locValues, (err, locationData) => {
            if (err) return res.send(err);
  
            // Return a response indicating success
            return res.json({
              listing: listingData,
              location: locationData,
            });

        //return res.json(data);
      });
    });
  });
  });
});
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = " DELETE FROM books WHERE id = ? ";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `desc`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values,bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
