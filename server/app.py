from flask import Flask, jsonify, request, redirect, url_for
import pandas as pd
import mysql.connector
from flask_cors import CORS


# MySQL configurations
mysql_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'root',
    'database': 'final_project'
}

conn = mysql.connector.connect(**mysql_config)
cur = conn.cursor()

# Fetch data from each table
cur.execute('SELECT * FROM details')
details_data = cur.fetchall()
details_columns = [desc[0] for desc in cur.description]
details_df = pd.DataFrame(details_data, columns=details_columns)

cur.execute('SELECT * FROM listing')
listing_data = cur.fetchall()
listing_columns = [desc[0] for desc in cur.description]
listing_df = pd.DataFrame(listing_data, columns=listing_columns)

cur.execute('SELECT * FROM location')
location_data = cur.fetchall()
location_columns = [desc[0] for desc in cur.description]
location_df = pd.DataFrame(location_data, columns=location_columns)

cur.execute('SELECT * FROM makers')
makers_data = cur.fetchall()
makers_columns = [desc[0] for desc in cur.description]
makers_df = pd.DataFrame(makers_data, columns=makers_columns)

cur.execute('SELECT * FROM standard_equipment')
standard_equipment_data = cur.fetchall()
standard_equipment_columns = [desc[0] for desc in cur.description]
standard_equipment_df = pd.DataFrame(standard_equipment_data, columns=standard_equipment_columns)

# Close MySQL connection
cur.close()
conn.close()

app = Flask(__name__)
CORS(app) 


# Home route to pull data from MySQL into DataFrames
@app.route('/')
def home():
    # Connect to MySQL
   
    # Do something with the dataframes if needed
    # ...

    return redirect(url_for('get_listings'))

@app.route('/listings', methods=['GET'])
def get_listings():
    return jsonify(listing_df.to_dict(orient='records'))

@app.route('/listings/<int:id>', methods=['GET'])
def get_listing(id):
    if id in listing_df['vehicle_id'].values:
        car_details = listing_df[listing_df['vehicle_id'] == id].to_dict(orient='records')[0]
        return jsonify(car_details)
    else:
        return jsonify({'message': 'Car not found'}), 404

@app.route('/listings', methods=['POST'])
def create_listing():
    data = request.get_json()
    global listing_df
    print(data)
    print(listing_df)
    # Add data to listing_df (assuming 'id' is auto-incremented)
    new_id = max(listing_df['vehicle_id']) + 1
    print('NEWWWW ID',new_id)
    data['vehicle_id'] = new_id
    listing_df = pd.concat([listing_df,pd.DataFrame([data])], ignore_index=True)

    conn = mysql.connector.connect(**mysql_config)
    cur = conn.cursor()

    # Update the MySQL database

    query = "INSERT INTO listing (vehicle_id, maker, model, price, year, body_type, sale_status, mileage, trim) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)"
    values = (f'{new_id}', data['maker'], data['model'], data['price'], data['year'], data['body_type'], data['sale_status'], data['mileage'], data['trim'])

    cur.execute(query,values)
    conn.commit()
    cur.close()
    conn.close()

    return jsonify({'message': 'Car created successfully'}), 201

@app.route('/listings/<int:id>', methods=['PUT'])
def update_listing(id):
    if id in listing_df['id'].values:
        data = request.get_json()
        
        # Update listing_df
        listing_df.loc[listing_df['vehicle_id'] == id] = data

        conn = mysql.connector.connect(**mysql_config)
        cur = conn.cursor()

        # Update the MySQL database
        #cur.execute(f"UPDATE listing SET maker='{data['maker']}', model='{data['model']}', body_type='{data['body_type']}', vehicle_id='{data['vehicle_id']}', car_price={data['car_price']}, image_url='{data.get('image_url', '')}' WHERE id={id}")
        cur.execute(f"UPDATE listing SET maker='{data['maker']}', model='{data['model']}', price={data['price']}, year={data['year']}, body_type='{data['body_type']}', sale_status='{data['sale_status']}', mileage={data['mileage']} WHERE id={id};")
        conn.commit()
        cur.close()
        conn.close()

        return jsonify({'message': 'Car updated successfully'})
    else:
        return jsonify({'message': 'Car not found'}), 404

@app.route('/listings/<int:id>', methods=['DELETE'])
def delete_listing(id):
    if id in listing_df['vehicle_id'].values:
        # Delete from listing_df
        listing_df = listing_df[listing_df['vehicle_id'] != id]

        conn = mysql.connector.connect(**mysql_config)
        cur = conn.cursor()

        # Delete from MySQL database
        cur.execute(f"DELETE FROM listing WHERE vehicle_id={id}")

        # Optionally, delete associated data from other tables
        cur.execute(f"DELETE FROM details WHERE vehicle_id={id}")
        cur.execute(f"DELETE FROM location WHERE vehicle_id={id}")
        cur.execute(f"DELETE FROM standard_equipment WHERE vehicle_id={id}")

        conn.commit()
        cur.close()
        conn.close()

        return jsonify({'message': 'Car deleted successfully'})
    else:
        return jsonify({'message': 'Car not found'}), 404
    
@app.route('/analysis', methods=['GET'])
def makeAnalysis():
    merged_df = pd.merge(listing_df, makers_df, how='left', left_on='maker', right_on='maker_id')
    maker_counts = merged_df['MakerName'].value_counts()
    result_json1 = maker_counts.reset_index().to_dict(orient='records')
    d1 = {}
    d2 = {}
    
    for r in result_json1:
        d1[r['MakerName']] = r['count'] 


    merged_locations_df = pd.merge(listing_df, location_df, how='left', left_on='vehicle_id', right_on='vehicle_id')
    location_counts = merged_locations_df['stateAbbreviation'].value_counts()
    result_json2 = location_counts.reset_index().to_dict(orient='records')

    for r in result_json2:
        d2[r["stateAbbreviation"]] = r['count'] 

    body_type_counts = listing_df['body_type'].value_counts()
    result_json3 = body_type_counts.to_dict()

    finalJson = {
        'Makers_Count': d1,
        'State_Count': d2,
        'Body_Type_Count': result_json3

    }

    return jsonify(finalJson)
if __name__ == '__main__':
    app.run(debug=True)
