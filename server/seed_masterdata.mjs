import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
const pool = new pg.Pool({ connectionString });

const masterData = {
  "Telangana": {
    "Adilabad District": ["Adilabad","Boath"],
    "Kumuram Bheem District": ["Asifabad","Sirpur","Kagaznagar"],
    "Nirmal District": ["Nirmal","Mudhole","Khanapur"],
    "Mancherial District": ["Mancherial","Bellampalli","Chennur"],
    "Nizamabad District": ["Nizamabad Urban","Nizamabad Rural","Balkonda","Armoor","Bodhan"],
    "Kamareddy District": ["Kamareddy","Banswada","Yellareddy"],
    "Karimnagar District": ["Karimnagar","Manakondur","Huzurabad"],
    "Jagitial District": ["Jagtial","Dharmapuri","Koratla"],
    "Peddapalli District": ["Peddapalle","Ramagundam","Manthani"],
    "Rajanna Sircilla District": ["Sircilla","Vemulawada"],
    "Siddipet District": ["Siddipet","Husnabad","Dubbaka","Gajwel"],
    "Medak District": ["Medak","Narsapur"],
    "Sangareddy District": ["Sangareddy","Patancheru","Andole","Zaheerabad"],
    "Medchal–Malkajgiri District": ["Malkajgiri","Quthbullapur","Kukatpally","Uppal","Medchal"],
    "Hyderabad District": ["Amberpet","Bahadurpura","Chandrayangutta","Charminar","Goshamahal","Karwan","Malakpet","Nampally","Khairatabad","Jubilee Hills","Sanathnagar","Musheerabad","Yakutpura","Secunderabad","Secunderabad Cantonment"],
    "Rangareddy District": ["Maheshwaram","Rajendranagar","Serilingampally","Ibrahimpatnam","Chevella"],
    "Vikarabad District": ["Vikarabad","Tandur","Parigi"],
    "Mahabubnagar District": ["Mahabubnagar","Jadcherla","Devarakadra"],
    "Narayanpet District": ["Narayanpet","Makthal"],
    "Wanaparthy District": ["Wanaparthy"],
    "Jogulamba Gadwal District": ["Gadwal","Alampur"],
    "Nagarkurnool District": ["Nagarkurnool","Achampet","Kollapur","Kalwakurthy"],
    "Nalgonda District": ["Nalgonda","Miryalaguda","Nagarjuna Sagar"],
    "Suryapet District": ["Suryapet","Kodad","Huzurnagar","Tungaturthi"],
    "Yadadri Bhuvanagiri District": ["Bhongir","Alair"],
    "Jangaon District": ["Jangaon","Station Ghanpur"],
    "Warangal District": ["Warangal West","Warangal East"],
    "Hanumakonda District": ["Hanamkonda","Parkal"],
    "Mahabubabad District": ["Mahabubabad","Dornakal"],
    "Jayashankar Bhupalpally District": ["Bhupalpally"],
    "Mulugu District": ["Mulugu"],
    "Khammam District": ["Khammam","Palair","Madhira","Wyra"],
    "Bhadradri Kothagudem District": ["Kothagudem","Yellandu","Pinapaka","Aswaraopeta","Bhadrachalam"]
  },
  "Andhra Pradesh": {
    "Srikakulam District": ["Ichchapuram","Palasa","Tekkali","Pathapatnam","Srikakulam","Amadalavalasa","Etcherla","Narasannapeta"],
    "Vizianagaram District": ["Rajam","Bobbili","Cheepurupalli","Gajapathinagaram","Nellimarla","Vizianagaram"],
    "Visakhapatnam District": ["Bheemunipatnam","Visakhapatnam East","Visakhapatnam West","Visakhapatnam North","Visakhapatnam South","Gajuwaka","Pendurthi"],
    "Alluri Sitharama Raju District": ["Araku Valley","Paderu","Rampachodavaram"],
    "Anakapalli District": ["Chodavaram","Madugula","Anakapalle","Yelamanchili","Payakaraopet","Narsipatnam"],
    "Kakinada District": ["Tuni","Prathipadu","Pithapuram","Kakinada Rural","Peddapuram","Kakinada City","Jaggampeta"],
    "Dr. B. R. Ambedkar Konaseema District": ["Ramachandrapuram","Mummidivaram","Amalapuram","Razole","Kothapeta","Mandapeta"],
    "East Godavari District": ["Anaparthy","Rajahmundry Rural","Rajahmundry City","Rajanagaram"],
    "West Godavari District": ["Gopalapuram","Nidadavole","Kovvur","Unguturu","Tanuku","Tadepalligudem"],
    "Eluru District": ["Denduluru","Eluru","Polavaram","Chintalapudi","Nuzvid","Kaikalur"],
    "Krishna District": ["Avanigadda","Gudivada","Pedana","Machilipatnam","Pamarru","Penamaluru"],
    "NTR District": ["Tiruvuru","Nandigama","Jaggaiahpet","Mylavaram","Vijayawada West","Vijayawada Central","Vijayawada East"],
    "Guntur District": ["Tadikonda","Mangalagiri","Ponnur","Tenali","Prathipadu","Guntur West","Guntur East"],
    "Bapatla District": ["Vemuru","Repalle","Bapatla","Parchur","Addanki","Chirala"],
    "Palnadu District": ["Pedakurapadu","Sattenapalli","Gurajala","Macherla","Vinukonda","Narasaraopet","Chilakaluripet"],
    "Prakasam District": ["Yerragondapalem","Darsi","Ongole","Kondapi","Markapuram","Giddalur","Kanigiri","Kandukur"],
    "Sri Potti Sriramulu Nellore District": ["Kavali","Atmakur","Kovur","Nellore City","Nellore Rural","Sarvepalli","Gudur","Sullurupeta","Venkatagiri","Udayagiri"],
    "Tirupati District": ["Satyavedu","Srikalahasti","Tirupati","Chandragiri","Nagari"],
    "Chittoor District": ["Chittoor","Puthalapattu","Gangadhara Nellore","Palamaner","Kuppam"],
    "Annamayya District": ["Rajampet","Kodur","Rayachoti","Madanapalle","Thamballapalle","Pileru"],
    "YSR Kadapa District": ["Badvel","Kadapa","Kamalapuram","Jammalamadugu","Proddatur","Mydukur","Pulivendula"],
    "Anantapur District": ["Guntakal","Uravakonda","Kalyandurg","Rayadurg","Singanamala","Anantapur Urban","Anantapur Rural","Raptadu"],
    "Sri Sathya Sai District": ["Tadipatri","Dharmavaram","Penukonda","Puttaparthi","Kadiri","Hindupur"],
    "Kurnool District": ["Kurnool","Kodumur","Pattikonda","Yemmiganur","Mantralayam","Adoni","Alur"],
    "Nandyal District": ["Allagadda","Srisailam","Nandikotkur","Panyam","Nandyal","Banaganapalle","Dhone"]
  }
};

async function ensureTables() {
  console.log('Ensuring masterdata tables exist...');
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_masterdata_location (
      id SERIAL PRIMARY KEY,
      state_name VARCHAR(150),
      district_name VARCHAR(150),
      constituency_name VARCHAR(150),
      mandal_name VARCHAR(150),
      UNIQUE(state_name, district_name, constituency_name, mandal_name)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_masterdata_city (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) UNIQUE
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_masterdata_category (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) UNIQUE
    )
  `);
}

async function seed() {
  try {
    await ensureTables();
    console.log('Tables ensured — starting inserts');

    for (const [state, districts] of Object.entries(masterData)) {
      for (const [district, constituencies] of Object.entries(districts)) {
        for (const constituency of constituencies) {
          // Insert location row with mandal as 'N/A' (mandal handled as text input)
          await pool.query(`INSERT INTO admin_masterdata_location (state_name, district_name, constituency_name, mandal_name) VALUES ($1,$2,$3,$4) ON CONFLICT DO NOTHING`, [state, district, constituency, 'N/A']);
          // Also add constituency as city for quick picks
          await pool.query(`INSERT INTO admin_masterdata_city (name) VALUES ($1) ON CONFLICT DO NOTHING`, [constituency]);
        }
      }
    }

    console.log('Master data seeded successfully');
  } catch (err) {
    console.error('Seeding failed:', err);
  } finally {
    await pool.end();
  }
}

seed();
