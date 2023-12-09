import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "b0fgxg3jzjqxw11dvzc2-mysql.services.clever-cloud.com",
  user: "uowqn7sdro4zn8hl",
  password: "XZDE3CewjBE4vJoGBy3V",
  database: "b0fgxg3jzjqxw11dvzc2",
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

app.get("/listings/select/:id", (req, res) => {
  const id = req.params.id;
  const q = "SELECT l.price, l.year, l.vehicle_id, m.MakerName, l.model, l.body_type, l.trim, l.mileage, l.sale_status, loc.addressLine1, loc.city, loc.stateAbbreviation, loc.zip5 FROM listing l JOIN makers m ON l.vehicle_id = m.vehicle_id JOIN location loc ON l.vehicle_id = loc.vehicle_id where l.vehicle_id = ?";

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

          const insertMakerquery =
          "INSERT INTO makers (MakerName, maker_id, vehicle_id) VALUES (?, ?, ?)";

          const makerValues = [
            req.body.MakerName,
            maxMaker + 1,
            maxVehicleId + 1, 
          ];
    
          db.query(insertLocationQuery, locValues, (err, locationData) => {
            if (err) return res.send(err);

          db.query(insertMakerquery, makerValues, (err, makerData) => {
              if (err) return res.send(err);
  
            // Return a response indicating success
            return res.json({
              listing: listingData,
              location: locationData,
              makers:makerData
            });

        //return res.json(data);
      });
    });
    });
  });
  });
});
});

app.delete("/listings/:id", (req, res) => {
  const id = req.params.id;

  // Delete from the 'location' table
  const deleteLocationQuery = "DELETE FROM location WHERE vehicle_id = ?";
  db.query(deleteLocationQuery, [id], (err, locationData) => {
    if (err) return res.send(err);

    // Delete from the 'makers' table
    const deleteMakersQuery = "DELETE FROM makers WHERE vehicle_id = ?";
    db.query(deleteMakersQuery, [id], (err, makersData) => {
      if (err) return res.send(err);

      // Delete from the 'listing' table
      const deleteListingQuery = "DELETE FROM listing WHERE vehicle_id = ?";
      db.query(deleteListingQuery, [id], (err, listingData) => {
        if (err) return res.send(err);

        // Return a response indicating success
        return res.json({
          location: locationData,
          makers: makersData,
          listing: listingData,
        });
      });
    });
  });
});


app.put("/listings/:id", (req, res) => {
  const id = req.params.id;

  // Update query for the listing table
  const updateListingQuery =
    "UPDATE listing SET model = ?, price = ?, year = ?, body_type = ?, sale_status = ?, mileage = ?, trim = ? WHERE vehicle_id = ?";

  const listingValues = [
    req.body.model,
    req.body.price,
    req.body.year,
    req.body.body_type,
    req.body.sale_status,
    req.body.mileage,
    req.body.trim,
  ];

  // Perform the update for the listing table
  db.query(updateListingQuery, [...listingValues, id], (err, listingData) => {
    if (err) return res.send(err);

    // Update query for the location table
    const updateLocationQuery =
      "UPDATE location SET addressLine1 = ?, city = ?, stateAbbreviation = ?, zip5 = ? WHERE vehicle_id = ?";

    const locationValues = [
      req.body.addressLine1,
      req.body.city,
      req.body.stateAbbreviation,
      req.body.zip5,
    ];

    // Perform the update for the location table
    db.query(updateLocationQuery, [...locationValues, id], (err, locationData) => {
      if (err) return res.send(err);

    // Update query for the makers table
    const updateMakersQuery = "UPDATE makers SET MakerName = ? WHERE vehicle_id = ?";

    const makerValues = [req.body.MakerName]; // Adjust column names as per your schema

    // Perform the update for the makers table
    db.query(updateMakersQuery, [...makerValues, id], (err, makersData) => {
      if (err) return res.send(err);


      // Return a response indicating success
      return res.json({
        listing: listingData,
        location: locationData,
        makers: makersData
      });
    });
  });
});
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
