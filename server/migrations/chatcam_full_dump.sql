--
-- PostgreSQL database dump
--

\restrict dGQnIzSJPnDBouAcxufd0b5hBEPHnBqGf0evd2Osi8u4Ug6GLjQgbns6yLwgjWo

-- Dumped from database version 15.16 (Debian 15.16-1.pgdg13+1)
-- Dumped by pg_dump version 15.16 (Debian 15.16-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE chatcam;
--
-- Name: chatcam; Type: DATABASE; Schema: -; Owner: -
--

CREATE DATABASE chatcam WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


\unrestrict dGQnIzSJPnDBouAcxufd0b5hBEPHnBqGf0evd2Osi8u4Ug6GLjQgbns6yLwgjWo
\connect chatcam
\restrict dGQnIzSJPnDBouAcxufd0b5hBEPHnBqGf0evd2Osi8u4Ug6GLjQgbns6yLwgjWo

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin_masterdata_category; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_masterdata_category (
    id integer NOT NULL,
    name text
);


--
-- Name: admin_masterdata_category_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.admin_masterdata_category_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_masterdata_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.admin_masterdata_category_id_seq OWNED BY public.admin_masterdata_category.id;


--
-- Name: admin_masterdata_city; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_masterdata_city (
    id integer NOT NULL,
    name text
);


--
-- Name: admin_masterdata_city_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.admin_masterdata_city_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_masterdata_city_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.admin_masterdata_city_id_seq OWNED BY public.admin_masterdata_city.id;


--
-- Name: admin_masterdata_location; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.admin_masterdata_location (
    id integer NOT NULL,
    state_name text,
    district_name text,
    constituency_name text,
    mandal_name text
);


--
-- Name: admin_masterdata_location_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.admin_masterdata_location_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: admin_masterdata_location_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.admin_masterdata_location_id_seq OWNED BY public.admin_masterdata_location.id;


--
-- Name: ads; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ads (
    id integer NOT NULL,
    image_url text NOT NULL,
    text text,
    link text,
    start_date date,
    end_date date,
    run_mode character varying(20) DEFAULT 'all'::character varying,
    target_locations jsonb DEFAULT '[]'::jsonb,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: ads_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ads_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: ads_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ads_id_seq OWNED BY public.ads.id;


--
-- Name: constituencies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.constituencies (
    id integer NOT NULL,
    district_id integer,
    name character varying(100)
);


--
-- Name: constituencies_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.constituencies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: constituencies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.constituencies_id_seq OWNED BY public.constituencies.id;


--
-- Name: districts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.districts (
    id integer NOT NULL,
    state_id integer,
    name character varying(100)
);


--
-- Name: districts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.districts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: districts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.districts_id_seq OWNED BY public.districts.id;


--
-- Name: feedbacks; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.feedbacks (
    id integer NOT NULL,
    user_id integer,
    message text NOT NULL,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: feedbacks_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.feedbacks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: feedbacks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.feedbacks_id_seq OWNED BY public.feedbacks.id;


--
-- Name: mandals; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.mandals (
    id integer NOT NULL,
    constituency_id integer,
    name character varying(100)
);


--
-- Name: mandals_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.mandals_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: mandals_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.mandals_id_seq OWNED BY public.mandals.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    title character varying(200) NOT NULL,
    message text,
    is_scheduled boolean DEFAULT false,
    scheduled_at timestamp without time zone,
    status character varying(20) DEFAULT 'draft'::character varying,
    target_user_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer,
    message text,
    post_images text[],
    post_videos text[],
    likes_count integer DEFAULT 0,
    "timestamp" timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: states; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.states (
    id integer NOT NULL,
    name character varying(100)
);


--
-- Name: states_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.states_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: states_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.states_id_seq OWNED BY public.states.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(50),
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(100),
    mobile character varying(15),
    photo_url text,
    bio text,
    state character varying(100),
    district character varying(100),
    constituency character varying(100),
    mandal character varying(100),
    village character varying(100),
    selected_category character varying(100),
    setup_completed boolean DEFAULT false,
    role character varying(20) DEFAULT 'user'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    selected_city character varying(100),
    device_id text
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: villages; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.villages (
    id integer NOT NULL,
    mandal_id integer,
    name character varying(100)
);


--
-- Name: villages_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.villages_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: villages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.villages_id_seq OWNED BY public.villages.id;


--
-- Name: admin_masterdata_category id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_masterdata_category ALTER COLUMN id SET DEFAULT nextval('public.admin_masterdata_category_id_seq'::regclass);


--
-- Name: admin_masterdata_city id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_masterdata_city ALTER COLUMN id SET DEFAULT nextval('public.admin_masterdata_city_id_seq'::regclass);


--
-- Name: admin_masterdata_location id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_masterdata_location ALTER COLUMN id SET DEFAULT nextval('public.admin_masterdata_location_id_seq'::regclass);


--
-- Name: ads id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ads ALTER COLUMN id SET DEFAULT nextval('public.ads_id_seq'::regclass);


--
-- Name: constituencies id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.constituencies ALTER COLUMN id SET DEFAULT nextval('public.constituencies_id_seq'::regclass);


--
-- Name: districts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.districts ALTER COLUMN id SET DEFAULT nextval('public.districts_id_seq'::regclass);


--
-- Name: feedbacks id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.feedbacks ALTER COLUMN id SET DEFAULT nextval('public.feedbacks_id_seq'::regclass);


--
-- Name: mandals id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mandals ALTER COLUMN id SET DEFAULT nextval('public.mandals_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: states id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.states ALTER COLUMN id SET DEFAULT nextval('public.states_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: villages id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.villages ALTER COLUMN id SET DEFAULT nextval('public.villages_id_seq'::regclass);


--
-- Data for Name: admin_masterdata_category; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.admin_masterdata_category (id, name) FROM stdin;
1	Cameras & drone
2	Video editing & Album design
3	Printing lab
4	Human Resources
6	Events
\.


--
-- Data for Name: admin_masterdata_city; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.admin_masterdata_city (id, name) FROM stdin;
1	Adilabad
2	Adoni
3	Alwal
4	Amalapuram
5	Anakapalle
6	Anantapur
7	Armur
8	Bapatla
9	Bellampalli
10	Bhadrachalam
11	Bhimavaram
12	Bhongir
13	Bobbili
14	Bodhan
15	Chilakaluripet
16	Chirala
17	Chittoor
18	Dasnapur
19	Devarakonda
20	Dharmavaram
21	Eluru
22	Farooqnagar
23	Gadwal
24	Gajuwaka
25	Gudivada
26	Gudur
27	Guntakal
28	Guntur
29	Hindupur
30	Hyderabad
31	Ichchapuram
32	Jagtial
33	Jammalamadugu
34	Jangaon
35	Kadapa
36	Kadiam
37	Kagaznagar
38	Kakinada
39	Kamareddy
40	Kandukur
41	Kapra
42	Karimnagar
43	Kavali
44	Khammam
45	Koratla
46	Kothagudem
47	Kothapeta
48	Kovvur
49	Kurnool
50	Kyathampalle
51	L.B. Nagar
52	Macherla
53	Machilipatnam
54	Madanapalle
55	Mahbubnagar
56	Malkajgiri
57	Mancherial
58	Mandamarri
59	Mangalagiri
60	Manuguru
61	Markapur
62	Medak
63	Meerpet
64	Miryalaguda
65	Nagari
66	Nagarkurnool
67	Nalgonda
68	Nandyal
69	Narasapur
70	Narasaraopet
71	Narsipatnam
72	Nellore
73	Nirmal
74	Nizamabad
75	Nuzvid
76	Ongole
77	Palacole
78	Palwancha
79	Piduguralla
80	Pithapuram
81	Ponnur
82	Proddatur
83	Punganur
84	Puttur
85	Quthbullapur
86	Rajahmundry
87	Rajampet
88	Rajendranagar
89	Ramachandrapuram
90	Ramagundam
91	Rayachoti
92	Rayadurg
93	Renigunta
94	Repalle
95	Sadasivpet
96	Salur
97	Samalkot
98	Sangareddy
99	Sattenapalle
100	Secunderabad
101	Serilingampally
102	Siddipet
103	Sircilla
104	Srikakulam
105	Srikalahasti
106	Suryapet
107	Tadepalligudem
108	Tadpatri
109	Tandur
110	Tanuku
111	Tenali
112	Tirupati
113	Tuni
114	Uppal
115	Venkatagiri
116	Vicarabad
117	Vijayawada
118	Vinukonda
119	Visakhapatnam
120	Vizianagaram
121	Wanaparthy
122	Warangal
123	Yemmiganur
124	Yerraguntla
125	Zahirabad
\.


--
-- Data for Name: admin_masterdata_location; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.admin_masterdata_location (id, state_name, district_name, constituency_name, mandal_name) FROM stdin;
1	Andhra Pradesh	Srikakulam	Ichchapuram	Ichchapuram
2	Andhra Pradesh	Srikakulam	Ichchapuram	Kanchili
3	Andhra Pradesh	Srikakulam	Ichchapuram	Kaviti
4	Andhra Pradesh	Srikakulam	Ichchapuram	Sompeta
5	Andhra Pradesh	Srikakulam	Palasa	Palasa
6	Andhra Pradesh	Srikakulam	Palasa	Mandasa
7	Andhra Pradesh	Srikakulam	Palasa	Vajrapukotturu
8	Andhra Pradesh	Srikakulam	Tekkali	Tekkali
9	Andhra Pradesh	Srikakulam	Tekkali	Kotabommali
10	Andhra Pradesh	Srikakulam	Tekkali	Santhabommali
11	Andhra Pradesh	Srikakulam	Tekkali	Nandigam
12	Andhra Pradesh	Srikakulam	Pathapatnam	Pathapatnam
13	Andhra Pradesh	Srikakulam	Pathapatnam	Meliaputti
14	Andhra Pradesh	Srikakulam	Pathapatnam	L.N. Pet
15	Andhra Pradesh	Srikakulam	Pathapatnam	Kothur
16	Andhra Pradesh	Srikakulam	Pathapatnam	Hiramandalam
17	Andhra Pradesh	Srikakulam	Srikakulam	Srikakulam
18	Andhra Pradesh	Srikakulam	Srikakulam	Gara
19	Andhra Pradesh	Srikakulam	Amadalavalasa	Amadalavalasa
20	Andhra Pradesh	Srikakulam	Amadalavalasa	Ponduru
21	Andhra Pradesh	Srikakulam	Amadalavalasa	Sarubujjili
22	Andhra Pradesh	Srikakulam	Amadalavalasa	Burja
23	Andhra Pradesh	Srikakulam	Etcherla	Etcherla
24	Andhra Pradesh	Srikakulam	Etcherla	Laveru
25	Andhra Pradesh	Srikakulam	Etcherla	Ranastalam
26	Andhra Pradesh	Srikakulam	Etcherla	G. Sigadam
27	Andhra Pradesh	Srikakulam	Narasannapeta	Narasannapeta
28	Andhra Pradesh	Srikakulam	Narasannapeta	Jalumuru
29	Andhra Pradesh	Srikakulam	Narasannapeta	Polaki
30	Andhra Pradesh	Srikakulam	Narasannapeta	Saravakota
31	Andhra Pradesh	Srikakulam	Rajam	Rajam
32	Andhra Pradesh	Srikakulam	Rajam	Vangara
33	Andhra Pradesh	Srikakulam	Rajam	Regidi Amadalavalasa
34	Andhra Pradesh	Srikakulam	Rajam	Santhakaviti
35	Andhra Pradesh	Srikakulam	Palakonda	Palakonda
36	Andhra Pradesh	Srikakulam	Palakonda	Seethampeta
37	Andhra Pradesh	Srikakulam	Palakonda	Bhamini
38	Andhra Pradesh	Srikakulam	Palakonda	Veeraghattam
39	Andhra Pradesh	Vizianagaram	Kurupam	Kurupam
40	Andhra Pradesh	Vizianagaram	Kurupam	Gummalakshmipuram
41	Andhra Pradesh	Vizianagaram	Kurupam	Jiyyammavalasa
42	Andhra Pradesh	Vizianagaram	Kurupam	Komarada
43	Andhra Pradesh	Vizianagaram	Kurupam	Garugubilli
44	Andhra Pradesh	Vizianagaram	Parvathipuram	Parvathipuram
45	Andhra Pradesh	Vizianagaram	Parvathipuram	Seethanagaram
46	Andhra Pradesh	Vizianagaram	Parvathipuram	Balijipeta
47	Andhra Pradesh	Vizianagaram	Salur	Salur
48	Andhra Pradesh	Vizianagaram	Salur	Pachipenta
49	Andhra Pradesh	Vizianagaram	Salur	Mentada
50	Andhra Pradesh	Vizianagaram	Salur	Makkuva
51	Andhra Pradesh	Vizianagaram	Bobbili	Bobbili
52	Andhra Pradesh	Vizianagaram	Bobbili	Ramabhadrapuram
53	Andhra Pradesh	Vizianagaram	Bobbili	Badangi
54	Andhra Pradesh	Vizianagaram	Bobbili	Therlam
55	Andhra Pradesh	Vizianagaram	Cheepurupalli	Cheepurupalli
56	Andhra Pradesh	Vizianagaram	Cheepurupalli	Merakamudidam
57	Andhra Pradesh	Vizianagaram	Cheepurupalli	Garividi
58	Andhra Pradesh	Vizianagaram	Cheepurupalli	Gurla
59	Andhra Pradesh	Vizianagaram	Gajapathinagaram	Gajapathinagaram
60	Andhra Pradesh	Vizianagaram	Gajapathinagaram	Bondapalli
61	Andhra Pradesh	Vizianagaram	Gajapathinagaram	Gantyada
62	Andhra Pradesh	Vizianagaram	Gajapathinagaram	Dattirajeru
63	Andhra Pradesh	Vizianagaram	Nellimarla	Nellimarla
64	Andhra Pradesh	Vizianagaram	Nellimarla	Pusapatirega
65	Andhra Pradesh	Vizianagaram	Nellimarla	Denkada
66	Andhra Pradesh	Vizianagaram	Nellimarla	Bhogapuram
67	Andhra Pradesh	Vizianagaram	Vizianagaram	Vizianagaram
68	Andhra Pradesh	Vizianagaram	Srungavarapukota	Srungavarapukota
69	Andhra Pradesh	Vizianagaram	Srungavarapukota	Lakkavarapukota
70	Andhra Pradesh	Vizianagaram	Srungavarapukota	Kothavalasa
71	Andhra Pradesh	Vizianagaram	Srungavarapukota	Vepada
72	Andhra Pradesh	Vizianagaram	Srungavarapukota	Jami
73	Andhra Pradesh	Visakhapatnam	Bhimili	Bheemunipatnam
74	Andhra Pradesh	Visakhapatnam	Bhimili	Anandapuram
75	Andhra Pradesh	Visakhapatnam	Bhimili	Padmanabham
76	Andhra Pradesh	Visakhapatnam	Bhimili	Visakhapatnam Rural
77	Andhra Pradesh	Visakhapatnam	Visakhapatnam East	Visakhapatnam Urban (Part)
78	Andhra Pradesh	Visakhapatnam	Visakhapatnam South	Visakhapatnam Urban (Part)
79	Andhra Pradesh	Visakhapatnam	Visakhapatnam North	Visakhapatnam Urban (Part)
80	Andhra Pradesh	Visakhapatnam	Visakhapatnam West	Visakhapatnam Urban (Part)
81	Andhra Pradesh	Visakhapatnam	Gajuwaka	Gajuwaka
82	Andhra Pradesh	Visakhapatnam	Gajuwaka	Pedagantyada
83	Andhra Pradesh	Anakapalli	Chodavaram	Chodavaram
84	Andhra Pradesh	Anakapalli	Chodavaram	Butchayyapeta
85	Andhra Pradesh	Anakapalli	Chodavaram	Rolugunta
86	Andhra Pradesh	Anakapalli	Madugula	Madugula
87	Andhra Pradesh	Anakapalli	Madugula	Cheedikada
88	Andhra Pradesh	Anakapalli	Madugula	Devarapalle
89	Andhra Pradesh	Anakapalli	Madugula	K.Kotapadu
90	Andhra Pradesh	Anakapalli	Anakapalle	Anakapalle
91	Andhra Pradesh	Anakapalli	Anakapalle	Kasimkota
92	Andhra Pradesh	Anakapalli	Pendurthi	Pendurthi
93	Andhra Pradesh	Anakapalli	Pendurthi	Paravada
94	Andhra Pradesh	Anakapalli	Pendurthi	Sabbavaram
95	Andhra Pradesh	Anakapalli	Elamanchili	Elamanchili
897	Telangana	Medak	Patancheru	Jinnaram
96	Andhra Pradesh	Anakapalli	Elamanchili	Rambilli
97	Andhra Pradesh	Anakapalli	Elamanchili	Munagapaka
98	Andhra Pradesh	Anakapalli	Elamanchili	Atchutapuram
99	Andhra Pradesh	Anakapalli	Payakaraopet	Payakaraopeta
100	Andhra Pradesh	Anakapalli	Payakaraopet	Nakkapalle
101	Andhra Pradesh	Anakapalli	Payakaraopet	Kotauratla
102	Andhra Pradesh	Anakapalli	Payakaraopet	S.Rayavaram
103	Andhra Pradesh	Anakapalli	Narsipatnam	Narsipatnam
104	Andhra Pradesh	Anakapalli	Narsipatnam	Golugonda
105	Andhra Pradesh	Anakapalli	Narsipatnam	Makavarapalem
106	Andhra Pradesh	Anakapalli	Narsipatnam	Nathavaram
107	Andhra Pradesh	Alluri Sitharama Raju	Araku Valley	Araku Valley
108	Andhra Pradesh	Alluri Sitharama Raju	Araku Valley	Pedabayalu
109	Andhra Pradesh	Alluri Sitharama Raju	Araku Valley	Dumbriguda
110	Andhra Pradesh	Alluri Sitharama Raju	Araku Valley	Munchingiputtu
111	Andhra Pradesh	Alluri Sitharama Raju	Araku Valley	Hukumpeta
112	Andhra Pradesh	Alluri Sitharama Raju	Araku Valley	Ananthagiri
113	Andhra Pradesh	Alluri Sitharama Raju	Paderu	Paderu
114	Andhra Pradesh	Alluri Sitharama Raju	Paderu	G.Madugula
115	Andhra Pradesh	Alluri Sitharama Raju	Paderu	Chintapalle
116	Andhra Pradesh	Alluri Sitharama Raju	Paderu	Gudem Kotha Veedhi
117	Andhra Pradesh	Alluri Sitharama Raju	Paderu	Koyyuru
118	Andhra Pradesh	Alluri Sitharama Raju	Rampachodavaram	Rampachodavaram
119	Andhra Pradesh	Alluri Sitharama Raju	Rampachodavaram	Devipatnam
120	Andhra Pradesh	Alluri Sitharama Raju	Rampachodavaram	Y. Ramavaram
121	Andhra Pradesh	Alluri Sitharama Raju	Rampachodavaram	Addateegala
122	Andhra Pradesh	Alluri Sitharama Raju	Rampachodavaram	Gangavaram
123	Andhra Pradesh	Alluri Sitharama Raju	Rampachodavaram	Maredumilli
124	Andhra Pradesh	Alluri Sitharama Raju	Rampachodavaram	Rajavommangi
125	Andhra Pradesh	Kakinada	Tuni	Tuni
126	Andhra Pradesh	Kakinada	Tuni	Thondangi
127	Andhra Pradesh	Kakinada	Tuni	Kotananduru
128	Andhra Pradesh	Kakinada	Prathipadu	Prathipadu
129	Andhra Pradesh	Kakinada	Prathipadu	Sankhavaram
130	Andhra Pradesh	Kakinada	Prathipadu	Yeleswaram
131	Andhra Pradesh	Kakinada	Prathipadu	Rowthulapudi
132	Andhra Pradesh	Kakinada	Pithapuram	Pithapuram
133	Andhra Pradesh	Kakinada	Pithapuram	U.Kothapalli
134	Andhra Pradesh	Kakinada	Pithapuram	Gollaprolu
135	Andhra Pradesh	Kakinada	Kakinada Rural	Kakinada Rural
136	Andhra Pradesh	Kakinada	Kakinada Rural	Karapa
137	Andhra Pradesh	Kakinada	Peddapuram	Peddapuram
138	Andhra Pradesh	Kakinada	Peddapuram	Samalkota
139	Andhra Pradesh	Kakinada	Kakinada City	Kakinada Urban
140	Andhra Pradesh	Kakinada	Jaggampeta	Jaggampeta
141	Andhra Pradesh	Kakinada	Jaggampeta	Gandepalli
142	Andhra Pradesh	Kakinada	Jaggampeta	Kirlampudi
143	Andhra Pradesh	East Godavari	Anaparthy	Anaparthy
144	Andhra Pradesh	East Godavari	Anaparthy	Biccavolu
145	Andhra Pradesh	East Godavari	Anaparthy	Rangampeta
146	Andhra Pradesh	East Godavari	Rajanagaram	Rajanagaram
147	Andhra Pradesh	East Godavari	Rajanagaram	Seethanagaram
148	Andhra Pradesh	East Godavari	Rajanagaram	Korukonda
149	Andhra Pradesh	East Godavari	Rajahmundry City	Rajahmundry Urban
150	Andhra Pradesh	East Godavari	Rajahmundry Rural	Rajahmundry Rural
151	Andhra Pradesh	East Godavari	Rajahmundry Rural	Kadiam
152	Andhra Pradesh	East Godavari	Kovvur	Kovvur
153	Andhra Pradesh	East Godavari	Kovvur	Chagallu
154	Andhra Pradesh	East Godavari	Kovvur	Tallapudi
155	Andhra Pradesh	East Godavari	Nidadavole	Nidadavole
156	Andhra Pradesh	East Godavari	Nidadavole	Undrajavaram
157	Andhra Pradesh	East Godavari	Nidadavole	Peravali
158	Andhra Pradesh	East Godavari	Gopalapuram	Gopalapuram
159	Andhra Pradesh	East Godavari	Gopalapuram	Devarapalle
160	Andhra Pradesh	East Godavari	Gopalapuram	Nallajarla
161	Andhra Pradesh	East Godavari	Gopalapuram	Dwarakatirumala
162	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Ramachandrapuram	Ramachandrapuram
163	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Ramachandrapuram	Kajuluru
164	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Ramachandrapuram	Pamarru
165	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Mummidivaram	Mummidivaram
166	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Mummidivaram	I. Polavaram
167	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Mummidivaram	Katrenikona
168	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Mummidivaram	Thallarevu
169	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Amalapuram	Amalapuram
170	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Amalapuram	Uppalaguptam
171	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Amalapuram	Allavaram
172	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Razole	Razole
173	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Razole	Malikipuram
174	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Razole	Sakhinetipalli
175	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Razole	Mamidikuduru
176	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Gannavaram	P.Gannavaram
177	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Gannavaram	Ambajipeta
178	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Gannavaram	Ainavilli
179	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Gannavaram	Mukteswaram
180	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Kothapeta	Kothapeta
181	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Kothapeta	Ravulapalem
182	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Kothapeta	Atreyapuram
183	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Kothapeta	Alamuru
184	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Mandapeta	Mandapeta
185	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Mandapeta	Rayavaram
186	Andhra Pradesh	Dr. B.R. Ambedkar Konaseema	Mandapeta	Kapileswarapuram
187	Andhra Pradesh	West Godavari	Achanta	Achanta
188	Andhra Pradesh	West Godavari	Achanta	Penugonda
189	Andhra Pradesh	West Godavari	Achanta	Penumantra
190	Andhra Pradesh	West Godavari	Achanta	Poduru
191	Andhra Pradesh	West Godavari	Palakollu	Palakollu
192	Andhra Pradesh	West Godavari	Palakollu	Yelamanchili
193	Andhra Pradesh	West Godavari	Palakollu	Poduru (Part)
194	Andhra Pradesh	West Godavari	Narasapuram	Narasapuram
195	Andhra Pradesh	West Godavari	Narasapuram	Mogalthur
196	Andhra Pradesh	West Godavari	Bhimavaram	Bhimavaram
197	Andhra Pradesh	West Godavari	Bhimavaram	Veeravasaram
198	Andhra Pradesh	West Godavari	Undi	Undi
199	Andhra Pradesh	West Godavari	Undi	Kalla
200	Andhra Pradesh	West Godavari	Undi	Palacoderu
201	Andhra Pradesh	West Godavari	Undi	Akividu
202	Andhra Pradesh	West Godavari	Tanuku	Tanuku
203	Andhra Pradesh	West Godavari	Tanuku	Attili
204	Andhra Pradesh	West Godavari	Tanuku	Iragavaram
205	Andhra Pradesh	West Godavari	Tadepalligudem	Tadepalligudem
206	Andhra Pradesh	West Godavari	Tadepalligudem	Pentapadu
207	Andhra Pradesh	Eluru	Unguturu	Unguturu
208	Andhra Pradesh	Eluru	Unguturu	Bhimadole
209	Andhra Pradesh	Eluru	Unguturu	Nidamarru
210	Andhra Pradesh	Eluru	Unguturu	Ganapavaram
211	Andhra Pradesh	Eluru	Denduluru	Denduluru
212	Andhra Pradesh	Eluru	Denduluru	Pedavegi
213	Andhra Pradesh	Eluru	Denduluru	Pedapadu
214	Andhra Pradesh	Eluru	Eluru	Eluru
215	Andhra Pradesh	Eluru	Polavaram	Polavaram
216	Andhra Pradesh	Eluru	Polavaram	Buttayagudem
217	Andhra Pradesh	Eluru	Polavaram	Jeelugumilli
218	Andhra Pradesh	Eluru	Polavaram	T. Narasapuram
219	Andhra Pradesh	Eluru	Polavaram	Kukkunoor
220	Andhra Pradesh	Eluru	Polavaram	Velerpadu
221	Andhra Pradesh	Eluru	Chintalapudi	Chintalapudi
222	Andhra Pradesh	Eluru	Chintalapudi	Lingapalem
223	Andhra Pradesh	Eluru	Chintalapudi	Kamavarapukota
224	Andhra Pradesh	Eluru	Chintalapudi	Jangareddigudem
225	Andhra Pradesh	Eluru	Nuzvid	Nuzvid
226	Andhra Pradesh	Eluru	Nuzvid	Agiripalli
227	Andhra Pradesh	Eluru	Nuzvid	Chatrai
228	Andhra Pradesh	Eluru	Nuzvid	Musunuru
229	Andhra Pradesh	Eluru	Kaikalur	Kaikalur
230	Andhra Pradesh	Eluru	Kaikalur	Mandavalli
231	Andhra Pradesh	Eluru	Kaikalur	Kalidindi
232	Andhra Pradesh	Eluru	Kaikalur	Mudinepalli
233	Andhra Pradesh	NTR	Tiruvuru	Tiruvuru
234	Andhra Pradesh	NTR	Tiruvuru	Gampalagudem
235	Andhra Pradesh	NTR	Tiruvuru	Vissannapeta
236	Andhra Pradesh	NTR	Tiruvuru	A.Konduru
237	Andhra Pradesh	NTR	Vijayawada West	Vijayawada Urban (Part)
238	Andhra Pradesh	NTR	Vijayawada Central	Vijayawada Urban (Part)
239	Andhra Pradesh	NTR	Vijayawada East	Vijayawada Urban (Part)
240	Andhra Pradesh	NTR	Mylavaram	Mylavaram
241	Andhra Pradesh	NTR	Mylavaram	G.Konduru
242	Andhra Pradesh	NTR	Mylavaram	Reddigudem
243	Andhra Pradesh	NTR	Mylavaram	Vijayawada Rural
244	Andhra Pradesh	NTR	Mylavaram	Ibrahimpatnam
245	Andhra Pradesh	NTR	Nandigama	Nandigama
246	Andhra Pradesh	NTR	Nandigama	Kanchikacherla
247	Andhra Pradesh	NTR	Nandigama	Chandarlapadu
248	Andhra Pradesh	NTR	Nandigama	Veerullapadu
249	Andhra Pradesh	NTR	Jaggayyapeta	Jaggayyapeta
250	Andhra Pradesh	NTR	Jaggayyapeta	Vatsavai
251	Andhra Pradesh	NTR	Jaggayyapeta	Penuganchiprolu
252	Andhra Pradesh	Krishna	Gannavaram	Gannavaram
253	Andhra Pradesh	Krishna	Gannavaram	Unguturu
254	Andhra Pradesh	Krishna	Gannavaram	Bapulapadu
255	Andhra Pradesh	Krishna	Gannavaram	Vijayawada Rural (Part)
256	Andhra Pradesh	Krishna	Gudivada	Gudivada
257	Andhra Pradesh	Krishna	Gudivada	Gudlavalleru
258	Andhra Pradesh	Krishna	Gudivada	Nandivada
259	Andhra Pradesh	Krishna	Pedana	Pedana
260	Andhra Pradesh	Krishna	Pedana	Guduru
261	Andhra Pradesh	Krishna	Pedana	Bantumilli
262	Andhra Pradesh	Krishna	Pedana	Kruthivennu
263	Andhra Pradesh	Krishna	Machilipatnam	Machilipatnam
264	Andhra Pradesh	Krishna	Avanigadda	Avanigadda
265	Andhra Pradesh	Krishna	Avanigadda	Nagayalanka
266	Andhra Pradesh	Krishna	Avanigadda	Koduru
267	Andhra Pradesh	Krishna	Avanigadda	Challapalli
268	Andhra Pradesh	Krishna	Avanigadda	Mopidevi
269	Andhra Pradesh	Krishna	Avanigadda	Ghantasala
270	Andhra Pradesh	Krishna	Pamarru	Pamarru
271	Andhra Pradesh	Krishna	Pamarru	Thotlavalluru
272	Andhra Pradesh	Krishna	Pamarru	Pamidimukkala
273	Andhra Pradesh	Krishna	Pamarru	Movva
274	Andhra Pradesh	Krishna	Pamarru	Pedaparupudi
275	Andhra Pradesh	Krishna	Penamaluru	Penamaluru
276	Andhra Pradesh	Krishna	Penamaluru	Kankipadu
277	Andhra Pradesh	Krishna	Penamaluru	Vuyyuru
278	Andhra Pradesh	Guntur	Tadikonda	Tadikonda
279	Andhra Pradesh	Guntur	Tadikonda	Thullur
280	Andhra Pradesh	Guntur	Tadikonda	Phirangipuram
281	Andhra Pradesh	Guntur	Tadikonda	Medikonduru
282	Andhra Pradesh	Guntur	Mangalagiri	Mangalagiri
283	Andhra Pradesh	Guntur	Mangalagiri	Tadepalle
284	Andhra Pradesh	Guntur	Mangalagiri	Duggirala
285	Andhra Pradesh	Guntur	Ponnuru	Ponnuru
286	Andhra Pradesh	Guntur	Ponnuru	Chebrolu
287	Andhra Pradesh	Guntur	Ponnuru	Kakumanu
288	Andhra Pradesh	Guntur	Tenali	Tenali
289	Andhra Pradesh	Guntur	Tenali	Kollipara
290	Andhra Pradesh	Guntur	Prathipadu	Prathipadu
291	Andhra Pradesh	Guntur	Prathipadu	Vatticherukuru
292	Andhra Pradesh	Guntur	Prathipadu	Guvaragupalem
293	Andhra Pradesh	Guntur	Prathipadu	Pedanandipadu
294	Andhra Pradesh	Guntur	Prathipadu	Kakumanu
295	Andhra Pradesh	Guntur	Guntur West	Guntur Urban (Part)
296	Andhra Pradesh	Guntur	Guntur East	Guntur Urban (Part)
297	Andhra Pradesh	Bapatla	Vemuru	Vemuru
298	Andhra Pradesh	Bapatla	Vemuru	Kolluru
299	Andhra Pradesh	Bapatla	Vemuru	Tsunduru
300	Andhra Pradesh	Bapatla	Vemuru	Bhattiprolu
301	Andhra Pradesh	Bapatla	Vemuru	Amruthalur
302	Andhra Pradesh	Bapatla	Repalle	Repalle
303	Andhra Pradesh	Bapatla	Repalle	Nizampatnam
304	Andhra Pradesh	Bapatla	Repalle	Nagaram
305	Andhra Pradesh	Bapatla	Repalle	Cherukupalle
306	Andhra Pradesh	Bapatla	Bapatla	Bapatla
307	Andhra Pradesh	Bapatla	Bapatla	Pittalavanipalem
308	Andhra Pradesh	Bapatla	Bapatla	Karlapalem
309	Andhra Pradesh	Bapatla	Parchur	Parchur
310	Andhra Pradesh	Bapatla	Parchur	Karamchedu
311	Andhra Pradesh	Bapatla	Parchur	Inkollu
312	Andhra Pradesh	Bapatla	Parchur	Chinaganjam
313	Andhra Pradesh	Bapatla	Parchur	Martur
314	Andhra Pradesh	Bapatla	Parchur	Yeddanapudi
315	Andhra Pradesh	Bapatla	Addanki	Addanki
316	Andhra Pradesh	Bapatla	Addanki	J.Panguluru
317	Andhra Pradesh	Bapatla	Addanki	Santhamaguluru
318	Andhra Pradesh	Bapatla	Addanki	Ballikurava
319	Andhra Pradesh	Bapatla	Addanki	Korisapadu
320	Andhra Pradesh	Bapatla	Chirala	Chirala
321	Andhra Pradesh	Bapatla	Chirala	Vetapalem
322	Andhra Pradesh	Palnadu	Pedakurapadu	Pedakurapadu
323	Andhra Pradesh	Palnadu	Pedakurapadu	Bellamkonda
324	Andhra Pradesh	Palnadu	Pedakurapadu	Atchampet
325	Andhra Pradesh	Palnadu	Pedakurapadu	Krosuru
326	Andhra Pradesh	Palnadu	Pedakurapadu	Amaravathi
327	Andhra Pradesh	Palnadu	Chilakaluripet	Chilakaluripet
328	Andhra Pradesh	Palnadu	Chilakaluripet	Nadendla
329	Andhra Pradesh	Palnadu	Chilakaluripet	Edlapadu
330	Andhra Pradesh	Palnadu	Narasaraopet	Narasaraopet
331	Andhra Pradesh	Palnadu	Narasaraopet	Rompicherla
332	Andhra Pradesh	Palnadu	Sattenapalle	Sattenapalle
333	Andhra Pradesh	Palnadu	Sattenapalle	Rajupalem
334	Andhra Pradesh	Palnadu	Sattenapalle	Nekarikallu
335	Andhra Pradesh	Palnadu	Sattenapalle	Muppalla
336	Andhra Pradesh	Palnadu	Vinukonda	Vinukonda
337	Andhra Pradesh	Palnadu	Vinukonda	Nuzendla
338	Andhra Pradesh	Palnadu	Vinukonda	Savalyapuram
339	Andhra Pradesh	Palnadu	Vinukonda	Ipur
340	Andhra Pradesh	Palnadu	Vinukonda	Bollapalle
341	Andhra Pradesh	Palnadu	Gurajala	Gurajala
342	Andhra Pradesh	Palnadu	Gurajala	Dachepalle
343	Andhra Pradesh	Palnadu	Gurajala	Piduguralla
344	Andhra Pradesh	Palnadu	Gurajala	Machavaram
345	Andhra Pradesh	Palnadu	Macherla	Macherla
346	Andhra Pradesh	Palnadu	Macherla	Veldurthi
347	Andhra Pradesh	Palnadu	Macherla	Durgi
348	Andhra Pradesh	Palnadu	Macherla	Rentachintala
349	Andhra Pradesh	Palnadu	Macherla	Karempudi
350	Andhra Pradesh	Prakasam	Yerragondapalem	Yerragondapalem
351	Andhra Pradesh	Prakasam	Yerragondapalem	Pullalacheruvu
352	Andhra Pradesh	Prakasam	Yerragondapalem	Tripurantakam
353	Andhra Pradesh	Prakasam	Yerragondapalem	Dornala
354	Andhra Pradesh	Prakasam	Yerragondapalem	Peda Araveedu
355	Andhra Pradesh	Prakasam	Darsi	Darsi
356	Andhra Pradesh	Prakasam	Darsi	Donakonda
357	Andhra Pradesh	Prakasam	Darsi	Kurichedu
358	Andhra Pradesh	Prakasam	Darsi	Mundlamuru
359	Andhra Pradesh	Prakasam	Darsi	Thallur
360	Andhra Pradesh	Prakasam	Santhanuthalapadu	Santhanuthalapadu
361	Andhra Pradesh	Prakasam	Santhanuthalapadu	Maddipadu
362	Andhra Pradesh	Prakasam	Santhanuthalapadu	Chimakurthy
363	Andhra Pradesh	Prakasam	Santhanuthalapadu	Naguluppalapadu
364	Andhra Pradesh	Prakasam	Ongole	Ongole
365	Andhra Pradesh	Prakasam	Ongole	Kothapatnam
366	Andhra Pradesh	Prakasam	Kondapi	Kondapi
367	Andhra Pradesh	Prakasam	Kondapi	Singarayakonda
368	Andhra Pradesh	Prakasam	Kondapi	Tangutur
369	Andhra Pradesh	Prakasam	Kondapi	Jarugumalli
370	Andhra Pradesh	Prakasam	Kondapi	Ponnaluru
371	Andhra Pradesh	Prakasam	Kondapi	Marripudi
372	Andhra Pradesh	Prakasam	Markapuram	Markapuram
373	Andhra Pradesh	Prakasam	Markapuram	Konakanamitla
374	Andhra Pradesh	Prakasam	Markapuram	Tarlupadu
375	Andhra Pradesh	Prakasam	Giddalur	Giddalur
376	Andhra Pradesh	Prakasam	Giddalur	Bestavaripeta
377	Andhra Pradesh	Prakasam	Giddalur	Racherla
378	Andhra Pradesh	Prakasam	Giddalur	Komarolu
379	Andhra Pradesh	Prakasam	Giddalur	Cumbum
380	Andhra Pradesh	Prakasam	Giddalur	Ardhaveedu
381	Andhra Pradesh	Prakasam	Kanigiri	Kanigiri
382	Andhra Pradesh	Prakasam	Kanigiri	Hanumanthunipadu
383	Andhra Pradesh	Prakasam	Kanigiri	Veligandla
384	Andhra Pradesh	Prakasam	Kanigiri	Pedacherlopalle
385	Andhra Pradesh	Prakasam	Kanigiri	Chandrasekharapuram
386	Andhra Pradesh	Prakasam	Kanigiri	Pamur
387	Andhra Pradesh	Sri Potti Sriramulu Nellore	Kandukur	Kandukur
388	Andhra Pradesh	Sri Potti Sriramulu Nellore	Kandukur	Lingasamudram
389	Andhra Pradesh	Sri Potti Sriramulu Nellore	Kandukur	Gudluru
390	Andhra Pradesh	Sri Potti Sriramulu Nellore	Kandukur	Ulavapadu
391	Andhra Pradesh	Sri Potti Sriramulu Nellore	Kandukur	Voletivaripalem
392	Andhra Pradesh	Sri Potti Sriramulu Nellore	Kavali	Kavali
393	Andhra Pradesh	Sri Potti Sriramulu Nellore	Kavali	Bogole
394	Andhra Pradesh	Sri Potti Sriramulu Nellore	Kavali	Allur
395	Andhra Pradesh	Sri Potti Sriramulu Nellore	Kavali	Dagadarthi
396	Andhra Pradesh	Sri Potti Sriramulu Nellore	Atmakur	Atmakur
397	Andhra Pradesh	Sri Potti Sriramulu Nellore	Atmakur	Chejerla
398	Andhra Pradesh	Sri Potti Sriramulu Nellore	Atmakur	Ananthasagaram
399	Andhra Pradesh	Sri Potti Sriramulu Nellore	Atmakur	Anamasamudramu
400	Andhra Pradesh	Sri Potti Sriramulu Nellore	Atmakur	Sangam
401	Andhra Pradesh	Sri Potti Sriramulu Nellore	Atmakur	Marripadu
402	Andhra Pradesh	Sri Potti Sriramulu Nellore	Kovuru	Kovuru
403	Andhra Pradesh	Sri Potti Sriramulu Nellore	Kovuru	Buchireddypalem
404	Andhra Pradesh	Sri Potti Sriramulu Nellore	Kovuru	Indukurpet
405	Andhra Pradesh	Sri Potti Sriramulu Nellore	Kovuru	Kodavalur
406	Andhra Pradesh	Sri Potti Sriramulu Nellore	Kovuru	Vidavalur
407	Andhra Pradesh	Sri Potti Sriramulu Nellore	Nellore City	Nellore Urban (Part)
408	Andhra Pradesh	Sri Potti Sriramulu Nellore	Nellore Rural	Nellore Rural
409	Andhra Pradesh	Sri Potti Sriramulu Nellore	Nellore Rural	Nellore Urban (Part)
410	Andhra Pradesh	Sri Potti Sriramulu Nellore	Sarvepalli	Podalakur
411	Andhra Pradesh	Sri Potti Sriramulu Nellore	Sarvepalli	Thotapalligudur
412	Andhra Pradesh	Sri Potti Sriramulu Nellore	Sarvepalli	Muthukur
413	Andhra Pradesh	Sri Potti Sriramulu Nellore	Sarvepalli	Venkatachalam
414	Andhra Pradesh	Sri Potti Sriramulu Nellore	Sarvepalli	Manubolu
415	Andhra Pradesh	Sri Potti Sriramulu Nellore	Udayagiri	Udayagiri
416	Andhra Pradesh	Sri Potti Sriramulu Nellore	Udayagiri	Varikuntapadu
417	Andhra Pradesh	Sri Potti Sriramulu Nellore	Udayagiri	Vinjamur
418	Andhra Pradesh	Sri Potti Sriramulu Nellore	Udayagiri	Duttalur
419	Andhra Pradesh	Sri Potti Sriramulu Nellore	Udayagiri	Sitarampuram
420	Andhra Pradesh	Sri Potti Sriramulu Nellore	Udayagiri	Kaligiri
421	Andhra Pradesh	Sri Potti Sriramulu Nellore	Udayagiri	Kondapuram
422	Andhra Pradesh	Sri Potti Sriramulu Nellore	Udayagiri	Jaladanki
423	Andhra Pradesh	Tirupati	Gudur	Gudur
424	Andhra Pradesh	Tirupati	Gudur	Chillakur
425	Andhra Pradesh	Tirupati	Gudur	Kota
426	Andhra Pradesh	Tirupati	Gudur	Vakadu
427	Andhra Pradesh	Tirupati	Gudur	Chittamur
428	Andhra Pradesh	Tirupati	Sullurpeta	Sullurpeta
429	Andhra Pradesh	Tirupati	Sullurpeta	Doravarisatram
430	Andhra Pradesh	Tirupati	Sullurpeta	Tada
431	Andhra Pradesh	Tirupati	Sullurpeta	Naidupeta
432	Andhra Pradesh	Tirupati	Sullurpeta	Pellakur
433	Andhra Pradesh	Tirupati	Sullurpeta	Ozili
434	Andhra Pradesh	Tirupati	Venkatagiri	Venkatagiri
435	Andhra Pradesh	Tirupati	Venkatagiri	Balayapalle
436	Andhra Pradesh	Tirupati	Venkatagiri	Dakkili
437	Andhra Pradesh	Tirupati	Venkatagiri	Rapur
438	Andhra Pradesh	Tirupati	Venkatagiri	Sydapuram
439	Andhra Pradesh	Tirupati	Venkatagiri	Kaluvoya
440	Andhra Pradesh	Tirupati	Chandragiri	Chandragiri
441	Andhra Pradesh	Tirupati	Chandragiri	Pakala
442	Andhra Pradesh	Tirupati	Chandragiri	Ramachandrapuram
443	Andhra Pradesh	Tirupati	Chandragiri	Chinnagottigallu
444	Andhra Pradesh	Tirupati	Chandragiri	Yerravaripalem
445	Andhra Pradesh	Tirupati	Chandragiri	Tirupati Rural (Part)
446	Andhra Pradesh	Tirupati	Tirupati	Tirupati Urban
447	Andhra Pradesh	Tirupati	Srikalahasti	Srikalahasti
448	Andhra Pradesh	Tirupati	Srikalahasti	Thottambedu
449	Andhra Pradesh	Tirupati	Srikalahasti	Renigunta
450	Andhra Pradesh	Tirupati	Srikalahasti	Yerpedu
451	Andhra Pradesh	Tirupati	Sathyavedu	Sathyavedu
452	Andhra Pradesh	Tirupati	Sathyavedu	Varadaiahpalem
453	Andhra Pradesh	Tirupati	Sathyavedu	K.V.B.Puram
454	Andhra Pradesh	Tirupati	Sathyavedu	Pichatur
455	Andhra Pradesh	Tirupati	Sathyavedu	Nagalapuram
456	Andhra Pradesh	Tirupati	Sathyavedu	Nindra
457	Andhra Pradesh	Tirupati	Sathyavedu	Vijayapuram
458	Andhra Pradesh	YSR Kadapa	Badvel	Badvel
459	Andhra Pradesh	YSR Kadapa	Badvel	Kalasapadu
460	Andhra Pradesh	YSR Kadapa	Badvel	B.Kodur
461	Andhra Pradesh	YSR Kadapa	Badvel	Sri Avadhutha Kasinayana
462	Andhra Pradesh	YSR Kadapa	Badvel	Porumamilla
463	Andhra Pradesh	YSR Kadapa	Badvel	Gopavaram
464	Andhra Pradesh	YSR Kadapa	Badvel	Atlur
465	Andhra Pradesh	YSR Kadapa	Kadapa	Kadapa
466	Andhra Pradesh	YSR Kadapa	Pulivendla	Pulivendla
467	Andhra Pradesh	YSR Kadapa	Pulivendla	Simhadripuram
468	Andhra Pradesh	YSR Kadapa	Pulivendla	Lingala
469	Andhra Pradesh	YSR Kadapa	Pulivendla	Thondur
470	Andhra Pradesh	YSR Kadapa	Pulivendla	Vempalli
471	Andhra Pradesh	YSR Kadapa	Pulivendla	Chakrayapeta
472	Andhra Pradesh	YSR Kadapa	Pulivendla	Vemula
473	Andhra Pradesh	YSR Kadapa	Kamalapuram	Kamalapuram
474	Andhra Pradesh	YSR Kadapa	Kamalapuram	Vallur
475	Andhra Pradesh	YSR Kadapa	Kamalapuram	Chennur
476	Andhra Pradesh	YSR Kadapa	Kamalapuram	Chintakommadinne
477	Andhra Pradesh	YSR Kadapa	Kamalapuram	Pendlimarri
478	Andhra Pradesh	YSR Kadapa	Kamalapuram	Veerapunayunipalle
479	Andhra Pradesh	YSR Kadapa	Jammalamadugu	Jammalamadugu
480	Andhra Pradesh	YSR Kadapa	Jammalamadugu	Mylavaram
481	Andhra Pradesh	YSR Kadapa	Jammalamadugu	Muddanur
482	Andhra Pradesh	YSR Kadapa	Jammalamadugu	Kondapuram
483	Andhra Pradesh	YSR Kadapa	Jammalamadugu	Peddamudium
484	Andhra Pradesh	YSR Kadapa	Jammalamadugu	Yerraguntla
485	Andhra Pradesh	YSR Kadapa	Proddatur	Proddatur
486	Andhra Pradesh	YSR Kadapa	Proddatur	Raju Palem
487	Andhra Pradesh	YSR Kadapa	Mydukur	Mydukur
488	Andhra Pradesh	YSR Kadapa	Mydukur	Duvvur
489	Andhra Pradesh	YSR Kadapa	Mydukur	S.Mydukur
490	Andhra Pradesh	YSR Kadapa	Mydukur	Brahmamgarimattam
491	Andhra Pradesh	YSR Kadapa	Mydukur	Khajipet
492	Andhra Pradesh	YSR Kadapa	Mydukur	Chapad
493	Andhra Pradesh	Annamayya	Rajampet	Rajampet
494	Andhra Pradesh	Annamayya	Rajampet	Nandalur
495	Andhra Pradesh	Annamayya	Rajampet	Veeraballe
496	Andhra Pradesh	Annamayya	Rajampet	Vontimitta
497	Andhra Pradesh	Annamayya	Rajampet	Siddavatam
498	Andhra Pradesh	Annamayya	Rajampet	T.Sundupalle
499	Andhra Pradesh	Annamayya	Kodur	Kodur
500	Andhra Pradesh	Annamayya	Kodur	Obulavaripalle
501	Andhra Pradesh	Annamayya	Kodur	Chitvel
502	Andhra Pradesh	Annamayya	Kodur	Pullampeta
503	Andhra Pradesh	Annamayya	Kodur	Penagaluru
504	Andhra Pradesh	Annamayya	Rayachoti	Rayachoti
505	Andhra Pradesh	Annamayya	Rayachoti	Sambepalli
506	Andhra Pradesh	Annamayya	Rayachoti	Chinnamandem
507	Andhra Pradesh	Annamayya	Rayachoti	Galiveedu
508	Andhra Pradesh	Annamayya	Rayachoti	Lakkireddipalli
509	Andhra Pradesh	Annamayya	Rayachoti	Ramapuram
510	Andhra Pradesh	Annamayya	Thamballapalle	Thamballapalle
511	Andhra Pradesh	Annamayya	Thamballapalle	Mulakalacheruvu
512	Andhra Pradesh	Annamayya	Thamballapalle	Peddamandyam
513	Andhra Pradesh	Annamayya	Thamballapalle	Kurabalakota
514	Andhra Pradesh	Annamayya	Thamballapalle	Peddathippasamudram
515	Andhra Pradesh	Annamayya	Thamballapalle	B.Kothakota
516	Andhra Pradesh	Annamayya	Pileru	Pileru
517	Andhra Pradesh	Annamayya	Pileru	Gurramkonda
518	Andhra Pradesh	Annamayya	Pileru	Kalakada
519	Andhra Pradesh	Annamayya	Pileru	K.V. Palle
520	Andhra Pradesh	Annamayya	Pileru	Valmikipuram
521	Andhra Pradesh	Annamayya	Pileru	Chinthaparthi
522	Andhra Pradesh	Annamayya	Madanapalle	Madanapalle
523	Andhra Pradesh	Annamayya	Madanapalle	Nimmanapalle
524	Andhra Pradesh	Annamayya	Madanapalle	Ramasamudram
525	Andhra Pradesh	Nandyal	Allagadda	Allagadda
526	Andhra Pradesh	Nandyal	Allagadda	Dornipadu
527	Andhra Pradesh	Nandyal	Allagadda	Uyyalawada
528	Andhra Pradesh	Nandyal	Allagadda	Chagalamarri
529	Andhra Pradesh	Nandyal	Allagadda	Rudravaram
530	Andhra Pradesh	Nandyal	Allagadda	Sirivella
531	Andhra Pradesh	Nandyal	Srisailam	Srisailam
532	Andhra Pradesh	Nandyal	Srisailam	Atmakur
533	Andhra Pradesh	Nandyal	Srisailam	Velgode
534	Andhra Pradesh	Nandyal	Srisailam	Bandi Atmakur
535	Andhra Pradesh	Nandyal	Srisailam	Mahanandi
536	Andhra Pradesh	Nandyal	Nandikotkur	Nandikotkur
537	Andhra Pradesh	Nandyal	Nandikotkur	Pagidyala
538	Andhra Pradesh	Nandyal	Nandikotkur	Jupadu Bungalow
539	Andhra Pradesh	Nandyal	Nandikotkur	Kothapalle
540	Andhra Pradesh	Nandyal	Nandikotkur	Pamulapadu
541	Andhra Pradesh	Nandyal	Nandikotkur	Midthur
542	Andhra Pradesh	Nandyal	Panyam	Panyam
543	Andhra Pradesh	Nandyal	Panyam	Gadivemula
544	Andhra Pradesh	Nandyal	Panyam	Kallur
545	Andhra Pradesh	Nandyal	Panyam	Orvakal
546	Andhra Pradesh	Nandyal	Nandyal	Nandyal
547	Andhra Pradesh	Nandyal	Nandyal	Gospadu
548	Andhra Pradesh	Nandyal	Banaganapalle	Banaganapalle
549	Andhra Pradesh	Nandyal	Banaganapalle	Owk
550	Andhra Pradesh	Nandyal	Banaganapalle	Koilakuntla
551	Andhra Pradesh	Nandyal	Banaganapalle	Sanjamala
552	Andhra Pradesh	Nandyal	Banaganapalle	Kolimigundla
553	Andhra Pradesh	Nandyal	Dhone	Dhone
554	Andhra Pradesh	Nandyal	Dhone	Bethamcherla
555	Andhra Pradesh	Nandyal	Dhone	Peapully
556	Andhra Pradesh	Kurnool	Kurnool	Kurnool Urban
557	Andhra Pradesh	Kurnool	Pattikonda	Pattikonda
558	Andhra Pradesh	Kurnool	Pattikonda	Maddikera
559	Andhra Pradesh	Kurnool	Pattikonda	Tuggali
560	Andhra Pradesh	Kurnool	Pattikonda	Veldurthi
561	Andhra Pradesh	Kurnool	Pattikonda	Krishnagiri
562	Andhra Pradesh	Kurnool	Kodumur	Kodumur
563	Andhra Pradesh	Kurnool	Kodumur	C.Belagal
564	Andhra Pradesh	Kurnool	Kodumur	Gudur
565	Andhra Pradesh	Kurnool	Kodumur	Kurnool Rural (Part)
566	Andhra Pradesh	Kurnool	Yemmiganur	Yemmiganur
567	Andhra Pradesh	Kurnool	Yemmiganur	Nandavaram
568	Andhra Pradesh	Kurnool	Yemmiganur	Gonegandla
569	Andhra Pradesh	Kurnool	Mantralayam	Mantralayam
570	Andhra Pradesh	Kurnool	Mantralayam	Kosigi
571	Andhra Pradesh	Kurnool	Mantralayam	Kowthalam
572	Andhra Pradesh	Kurnool	Mantralayam	Peddakadubur
573	Andhra Pradesh	Kurnool	Adoni	Adoni
574	Andhra Pradesh	Kurnool	Alur	Alur
575	Andhra Pradesh	Kurnool	Alur	Aspari
576	Andhra Pradesh	Kurnool	Alur	Devanakonda
577	Andhra Pradesh	Kurnool	Alur	Chippagiri
578	Andhra Pradesh	Kurnool	Alur	Halaharvi
579	Andhra Pradesh	Kurnool	Alur	Holagunda
580	Andhra Pradesh	Ananthapuramu	Rayadurg	Rayadurg
581	Andhra Pradesh	Ananthapuramu	Rayadurg	D.Hirehal
582	Andhra Pradesh	Ananthapuramu	Rayadurg	Kanekal
583	Andhra Pradesh	Ananthapuramu	Rayadurg	Bommanahal
584	Andhra Pradesh	Ananthapuramu	Rayadurg	Gummaghatta
585	Andhra Pradesh	Ananthapuramu	Uravakonda	Uravakonda
586	Andhra Pradesh	Ananthapuramu	Uravakonda	Beluguppa
587	Andhra Pradesh	Ananthapuramu	Uravakonda	Kudair
588	Andhra Pradesh	Ananthapuramu	Uravakonda	Vajrakarur
589	Andhra Pradesh	Ananthapuramu	Uravakonda	Vidapanakal
590	Andhra Pradesh	Ananthapuramu	Guntakal	Guntakal
591	Andhra Pradesh	Ananthapuramu	Guntakal	Gooty
592	Andhra Pradesh	Ananthapuramu	Guntakal	Pamidi
593	Andhra Pradesh	Ananthapuramu	Tadipatri	Tadipatri
594	Andhra Pradesh	Ananthapuramu	Tadipatri	Peddavadugur
595	Andhra Pradesh	Ananthapuramu	Tadipatri	Yadiki
596	Andhra Pradesh	Ananthapuramu	Tadipatri	Peddapappur
597	Andhra Pradesh	Ananthapuramu	Singanamala	Singanamala
598	Andhra Pradesh	Ananthapuramu	Singanamala	Garladinne
599	Andhra Pradesh	Ananthapuramu	Singanamala	Putlur
600	Andhra Pradesh	Ananthapuramu	Singanamala	Yellanur
601	Andhra Pradesh	Ananthapuramu	Singanamala	Narpala
602	Andhra Pradesh	Ananthapuramu	Singanamala	Bukkarayasamudram
603	Andhra Pradesh	Ananthapuramu	Anantapur Urban	Anantapur
604	Andhra Pradesh	Ananthapuramu	Kalyandurg	Kalyandurg
605	Andhra Pradesh	Ananthapuramu	Kalyandurg	Brahmasamudram
606	Andhra Pradesh	Ananthapuramu	Kalyandurg	Settur
607	Andhra Pradesh	Ananthapuramu	Kalyandurg	Kundurpi
608	Andhra Pradesh	Ananthapuramu	Kalyandurg	Kambadur
609	Andhra Pradesh	Ananthapuramu	Raptadu	Raptadu
610	Andhra Pradesh	Ananthapuramu	Raptadu	Atmakur
611	Andhra Pradesh	Ananthapuramu	Raptadu	Kanaganapalle
612	Andhra Pradesh	Ananthapuramu	Raptadu	C.K. Palle
613	Andhra Pradesh	Ananthapuramu	Raptadu	Ramagiri
614	Andhra Pradesh	Sri Sathya Sai	Madakasira	Madakasira
615	Andhra Pradesh	Sri Sathya Sai	Madakasira	Amarapuram
616	Andhra Pradesh	Sri Sathya Sai	Madakasira	Gudibanda
617	Andhra Pradesh	Sri Sathya Sai	Madakasira	Rolla
618	Andhra Pradesh	Sri Sathya Sai	Madakasira	Agali
619	Andhra Pradesh	Sri Sathya Sai	Hindupur	Hindupur
620	Andhra Pradesh	Sri Sathya Sai	Hindupur	Lepakshi
621	Andhra Pradesh	Sri Sathya Sai	Hindupur	Chilamathur
622	Andhra Pradesh	Sri Sathya Sai	Penukonda	Penukonda
623	Andhra Pradesh	Sri Sathya Sai	Penukonda	Roddam
624	Andhra Pradesh	Sri Sathya Sai	Penukonda	Somandepalle
625	Andhra Pradesh	Sri Sathya Sai	Penukonda	Gorantla
626	Andhra Pradesh	Sri Sathya Sai	Penukonda	Parigi
627	Andhra Pradesh	Sri Sathya Sai	Puttaparthi	Puttaparthi
628	Andhra Pradesh	Sri Sathya Sai	Puttaparthi	Nallamada
629	Andhra Pradesh	Sri Sathya Sai	Puttaparthi	Bukkapatnam
630	Andhra Pradesh	Sri Sathya Sai	Puttaparthi	Kothacheruvu
631	Andhra Pradesh	Sri Sathya Sai	Puttaparthi	O.D.Cheruvu
632	Andhra Pradesh	Sri Sathya Sai	Puttaparthi	Amadagur
633	Andhra Pradesh	Sri Sathya Sai	Dharmavaram	Dharmavaram
634	Andhra Pradesh	Sri Sathya Sai	Dharmavaram	Bathalapalle
635	Andhra Pradesh	Sri Sathya Sai	Dharmavaram	Tadimarri
636	Andhra Pradesh	Sri Sathya Sai	Dharmavaram	Mudigubba
637	Andhra Pradesh	Sri Sathya Sai	Kadiri	Kadiri
638	Andhra Pradesh	Sri Sathya Sai	Kadiri	Talupula
639	Andhra Pradesh	Sri Sathya Sai	Kadiri	Nambulipulikunta
640	Andhra Pradesh	Sri Sathya Sai	Kadiri	Gandlapenta
641	Andhra Pradesh	Sri Sathya Sai	Kadiri	Nallacheruvu
642	Andhra Pradesh	Sri Sathya Sai	Kadiri	Tanakal
643	Andhra Pradesh	Sri Sathya Sai	Kadiri	Talupula
644	Andhra Pradesh	Chittoor	Punganur	Punganur
645	Andhra Pradesh	Chittoor	Punganur	Chowdepalle
646	Andhra Pradesh	Chittoor	Punganur	Sodam
647	Andhra Pradesh	Chittoor	Punganur	Somala
648	Andhra Pradesh	Chittoor	Punganur	Peddapanjani
649	Andhra Pradesh	Chittoor	Punganur	Pulicherla
650	Andhra Pradesh	Chittoor	Punganur	Rompcicherla
651	Andhra Pradesh	Chittoor	Nagari	Nagari
652	Andhra Pradesh	Chittoor	Nagari	Nindra
653	Andhra Pradesh	Chittoor	Nagari	Vijayapuram
654	Andhra Pradesh	Chittoor	Nagari	Puttur
655	Andhra Pradesh	Chittoor	Nagari	Vadamalapeta
656	Andhra Pradesh	Chittoor	Gangadhara Nellore	Gangadhara Nellore
657	Andhra Pradesh	Chittoor	Gangadhara Nellore	Penumuru
658	Andhra Pradesh	Chittoor	Gangadhara Nellore	Vedurukuppam
659	Andhra Pradesh	Chittoor	Gangadhara Nellore	Karvetinagar
660	Andhra Pradesh	Chittoor	Gangadhara Nellore	S.R.Puram
661	Andhra Pradesh	Chittoor	Gangadhara Nellore	Palasamudram
662	Andhra Pradesh	Chittoor	Chittoor	Chittoor
663	Andhra Pradesh	Chittoor	Chittoor	Gudipala
664	Andhra Pradesh	Chittoor	Puthalapattu	Puthalapattu
665	Andhra Pradesh	Chittoor	Puthalapattu	Irala
666	Andhra Pradesh	Chittoor	Puthalapattu	Thavanampalle
667	Andhra Pradesh	Chittoor	Puthalapattu	Bangarupalem
668	Andhra Pradesh	Chittoor	Puthalapattu	Yadamari
669	Andhra Pradesh	Chittoor	Palamaner	Palamaner
670	Andhra Pradesh	Chittoor	Palamaner	Gangavaram
671	Andhra Pradesh	Chittoor	Palamaner	Baireddipalle
672	Andhra Pradesh	Chittoor	Palamaner	V.Kota
673	Andhra Pradesh	Chittoor	Palamaner	Peddapanjani
674	Andhra Pradesh	Chittoor	Kuppam	Kuppam
675	Andhra Pradesh	Chittoor	Kuppam	Shanthipuram
676	Andhra Pradesh	Chittoor	Kuppam	Gudupalle
677	Andhra Pradesh	Chittoor	Kuppam	Ramakuppam
678	Telangana	Adilabad	Sirpur	Sirpur (T)
679	Telangana	Adilabad	Sirpur	Kouthala
680	Telangana	Adilabad	Sirpur	Bejjur
681	Telangana	Adilabad	Sirpur	Dahegaon
682	Telangana	Adilabad	Sirpur	Penchikalpet
683	Telangana	Adilabad	Sirpur	Chintalamanepally
684	Telangana	Adilabad	Sirpur	Kagaznagar
685	Telangana	Adilabad	Chennur	Chennur
686	Telangana	Adilabad	Chennur	Kotapally
687	Telangana	Adilabad	Chennur	Jaipur
688	Telangana	Adilabad	Chennur	Mandamarri
689	Telangana	Adilabad	Chennur	Bheemaram
690	Telangana	Adilabad	Bellampalli	Bellampalli
691	Telangana	Adilabad	Bellampalli	Vemanpally
692	Telangana	Adilabad	Bellampalli	Nennel
693	Telangana	Adilabad	Bellampalli	Kasipet
694	Telangana	Adilabad	Bellampalli	Bhimini
695	Telangana	Adilabad	Bellampalli	Kannepally
696	Telangana	Adilabad	Bellampalli	Tandur
697	Telangana	Adilabad	Mancherial	Mancherial
698	Telangana	Adilabad	Mancherial	Naspur
699	Telangana	Adilabad	Mancherial	Hajipur
700	Telangana	Adilabad	Mancherial	Luxettipet
701	Telangana	Adilabad	Mancherial	Dandepally
702	Telangana	Adilabad	Asifabad	Asifabad
703	Telangana	Adilabad	Asifabad	Jainoor
704	Telangana	Adilabad	Asifabad	Tiryani
705	Telangana	Adilabad	Asifabad	Kerameri
706	Telangana	Adilabad	Asifabad	Wankdi
707	Telangana	Adilabad	Asifabad	Rebbena
708	Telangana	Adilabad	Asifabad	Sirpur (U)
709	Telangana	Adilabad	Asifabad	Lingapur
710	Telangana	Adilabad	Adilabad	Adilabad
711	Telangana	Adilabad	Adilabad	Jainad
712	Telangana	Adilabad	Adilabad	Bela
713	Telangana	Adilabad	Adilabad	Mavala
714	Telangana	Adilabad	Boath	Boath
715	Telangana	Adilabad	Boath	Bazarhathnoor
716	Telangana	Adilabad	Boath	Neradigonda
717	Telangana	Adilabad	Boath	Ichoda
718	Telangana	Adilabad	Boath	Gudihathnoor
719	Telangana	Adilabad	Boath	Talamadugu
720	Telangana	Adilabad	Boath	Tamsi
721	Telangana	Adilabad	Nirmal	Nirmal
722	Telangana	Adilabad	Nirmal	Dilawarpur
723	Telangana	Adilabad	Nirmal	Laxmanchanda
724	Telangana	Adilabad	Nirmal	Mamda
725	Telangana	Adilabad	Nirmal	Sarangapur
726	Telangana	Adilabad	Nirmal	Narsapur (G)
727	Telangana	Adilabad	Nirmal	Soan
728	Telangana	Adilabad	Mudhole	Mudhole
729	Telangana	Adilabad	Mudhole	Bhainsa
730	Telangana	Adilabad	Mudhole	Kubeer
731	Telangana	Adilabad	Mudhole	Tanur
732	Telangana	Adilabad	Mudhole	Lokeshwaram
733	Telangana	Adilabad	Mudhole	Basar
734	Telangana	Adilabad	Khanapur	Khanapur
735	Telangana	Adilabad	Khanapur	Kaddam
736	Telangana	Adilabad	Khanapur	Dasturabad
737	Telangana	Adilabad	Khanapur	Jannaram
738	Telangana	Adilabad	Khanapur	Pembi
739	Telangana	Nizamabad	Armur	Armur
740	Telangana	Nizamabad	Armur	Nandipet
741	Telangana	Nizamabad	Armur	Makloor
742	Telangana	Nizamabad	Armur	Mupkal
743	Telangana	Nizamabad	Armur	Alur
744	Telangana	Nizamabad	Armur	Donkeshwar
745	Telangana	Nizamabad	Bodhan	Bodhan
746	Telangana	Nizamabad	Bodhan	Ranjal
747	Telangana	Nizamabad	Bodhan	Navipet
748	Telangana	Nizamabad	Bodhan	Yedapally
749	Telangana	Nizamabad	Bodhan	Saloora
750	Telangana	Nizamabad	Jukkal	Jukkal
751	Telangana	Nizamabad	Jukkal	Madnoor
752	Telangana	Nizamabad	Jukkal	Bichkunda
753	Telangana	Nizamabad	Jukkal	Pitlam
754	Telangana	Nizamabad	Jukkal	Nizamsagar
755	Telangana	Nizamabad	Jukkal	Pedda Kodapgal
756	Telangana	Nizamabad	Jukkal	Dongli
757	Telangana	Nizamabad	Banswada	Banswada
758	Telangana	Nizamabad	Banswada	Birkoor
759	Telangana	Nizamabad	Banswada	Varni
760	Telangana	Nizamabad	Banswada	Nasrullabad
761	Telangana	Nizamabad	Banswada	Rudrur
762	Telangana	Nizamabad	Banswada	Chandur
763	Telangana	Nizamabad	Banswada	Mosra
764	Telangana	Nizamabad	Banswada	Kotagiri
765	Telangana	Nizamabad	Banswada	Pothangal
766	Telangana	Nizamabad	Yellareddy	Yellareddy
767	Telangana	Nizamabad	Yellareddy	Nagareddypet
768	Telangana	Nizamabad	Yellareddy	Lingampet
769	Telangana	Nizamabad	Yellareddy	Tadwai
770	Telangana	Nizamabad	Yellareddy	Gandhari
771	Telangana	Nizamabad	Yellareddy	Ramareddy
772	Telangana	Nizamabad	Yellareddy	Rajampet
773	Telangana	Nizamabad	Kamareddy	Kamareddy
774	Telangana	Nizamabad	Kamareddy	Machareddy
775	Telangana	Nizamabad	Kamareddy	Domakonda
776	Telangana	Nizamabad	Kamareddy	Bhiknoor
777	Telangana	Nizamabad	Kamareddy	Bibipet
778	Telangana	Nizamabad	Kamareddy	Rajampet
779	Telangana	Nizamabad	Nizamabad Urban	Nizamabad North
780	Telangana	Nizamabad	Nizamabad Urban	Nizamabad South
781	Telangana	Nizamabad	Nizamabad Rural	Nizamabad Rural
782	Telangana	Nizamabad	Nizamabad Rural	Jakranpally
783	Telangana	Nizamabad	Nizamabad Rural	Sirkonda
784	Telangana	Nizamabad	Nizamabad Rural	Dharpally
785	Telangana	Nizamabad	Nizamabad Rural	Indalwai
786	Telangana	Nizamabad	Nizamabad Rural	Mopal
787	Telangana	Nizamabad	Nizamabad Rural	Ditchpally
788	Telangana	Nizamabad	Balkonda	Balkonda
789	Telangana	Nizamabad	Balkonda	Morthad
790	Telangana	Nizamabad	Balkonda	Kammarpally
791	Telangana	Nizamabad	Balkonda	Velpur
792	Telangana	Nizamabad	Balkonda	Yergatla
793	Telangana	Nizamabad	Balkonda	Bheemgal
794	Telangana	Nizamabad	Balkonda	Mupkal
795	Telangana	Nizamabad	Balkonda	Mendora
796	Telangana	Karimnagar	Koratla	Koratla
797	Telangana	Karimnagar	Koratla	Metpally
798	Telangana	Karimnagar	Koratla	Ibrahimpatnam
799	Telangana	Karimnagar	Koratla	Mallapur
800	Telangana	Karimnagar	Jagtial	Jagtial
801	Telangana	Karimnagar	Jagtial	Raikal
802	Telangana	Karimnagar	Jagtial	Sarangapur
803	Telangana	Karimnagar	Jagtial	Beerpur
804	Telangana	Karimnagar	Jagtial	Jagtial Rural
805	Telangana	Karimnagar	Dharmapuri	Dharmapuri
806	Telangana	Karimnagar	Dharmapuri	Gollapally
807	Telangana	Karimnagar	Dharmapuri	Velgatoor
808	Telangana	Karimnagar	Dharmapuri	Pegadapally
809	Telangana	Karimnagar	Dharmapuri	Buggaram
810	Telangana	Karimnagar	Ramagundam	Ramagundam
811	Telangana	Karimnagar	Ramagundam	Anthargaon
812	Telangana	Karimnagar	Ramagundam	Palakurthy
813	Telangana	Karimnagar	Manthani	Manthani
814	Telangana	Karimnagar	Manthani	Kamanpur
815	Telangana	Karimnagar	Manthani	Kataram
816	Telangana	Karimnagar	Manthani	Mahadevpur
817	Telangana	Karimnagar	Manthani	Mutharam
818	Telangana	Karimnagar	Manthani	Malharrao
819	Telangana	Karimnagar	Manthani	Mutharam (Manthani)
820	Telangana	Karimnagar	Manthani	Palimela
821	Telangana	Karimnagar	Peddapalle	Peddapalle
822	Telangana	Karimnagar	Peddapalle	Julapalle
823	Telangana	Karimnagar	Peddapalle	Elimedu
824	Telangana	Karimnagar	Peddapalle	Sultanabad
825	Telangana	Karimnagar	Peddapalle	Odela
826	Telangana	Karimnagar	Peddapalle	Kalva Srirampur
827	Telangana	Karimnagar	Karimnagar	Karimnagar
828	Telangana	Karimnagar	Karimnagar	Kothapally
829	Telangana	Karimnagar	Karimnagar	Karimnagar Rural
830	Telangana	Karimnagar	Choppadandi	Choppadandi
831	Telangana	Karimnagar	Choppadandi	Gangadhara
832	Telangana	Karimnagar	Choppadandi	Ramadugu
833	Telangana	Karimnagar	Choppadandi	Mallial
834	Telangana	Karimnagar	Choppadandi	Kodimial
835	Telangana	Karimnagar	Choppadandi	Boinpalle
836	Telangana	Karimnagar	Vemulawada	Vemulawada
837	Telangana	Karimnagar	Vemulawada	Konaraopeta
838	Telangana	Karimnagar	Vemulawada	Chandurthi
839	Telangana	Karimnagar	Vemulawada	Medipalli
840	Telangana	Karimnagar	Vemulawada	Rudrangi
841	Telangana	Karimnagar	Vemulawada	Vemulawada Rural
842	Telangana	Karimnagar	Sircilla	Sircilla
843	Telangana	Karimnagar	Sircilla	Thangallapalli
844	Telangana	Karimnagar	Sircilla	Mustabad
845	Telangana	Karimnagar	Sircilla	Yellareddypeta
846	Telangana	Karimnagar	Sircilla	Gambhiraopet
847	Telangana	Karimnagar	Sircilla	Veernapalli
848	Telangana	Karimnagar	Manakondur	Manakondur
849	Telangana	Karimnagar	Manakondur	Ellanthakunta
850	Telangana	Karimnagar	Manakondur	Bejjanki
851	Telangana	Karimnagar	Manakondur	Timmapur
852	Telangana	Karimnagar	Manakondur	Shankarapatnam
853	Telangana	Karimnagar	Manakondur	Ganneruvaram
854	Telangana	Karimnagar	Huzurabad	Huzurabad
855	Telangana	Karimnagar	Huzurabad	Kamalapur
856	Telangana	Karimnagar	Huzurabad	Veenavanka
857	Telangana	Karimnagar	Huzurabad	Jammikunta
858	Telangana	Karimnagar	Huzurabad	Illanthakunta
859	Telangana	Karimnagar	Husnabad	Husnabad
860	Telangana	Karimnagar	Husnabad	Chigurumamidi
861	Telangana	Karimnagar	Husnabad	Koheda
862	Telangana	Karimnagar	Husnabad	Saidapur
863	Telangana	Karimnagar	Husnabad	Bheemadevarpalle
864	Telangana	Karimnagar	Husnabad	Elkathurthi
865	Telangana	Karimnagar	Husnabad	Akkannapet
866	Telangana	Medak	Siddipet	Siddipet Urban
867	Telangana	Medak	Siddipet	Siddipet Rural
868	Telangana	Medak	Siddipet	Chinnakodur
869	Telangana	Medak	Siddipet	Nangnoor
870	Telangana	Medak	Medak	Medak
871	Telangana	Medak	Medak	Papannapet
872	Telangana	Medak	Medak	Ramayampet
873	Telangana	Medak	Medak	Shankarampet Small
874	Telangana	Medak	Medak	Nizampet
875	Telangana	Medak	Narayankhed	Narayankhed
876	Telangana	Medak	Narayankhed	Kangti
877	Telangana	Medak	Narayankhed	Manoor
878	Telangana	Medak	Narayankhed	Kalher
879	Telangana	Medak	Narayankhed	Sirgapoor
880	Telangana	Medak	Narayankhed	Nagalgidda
881	Telangana	Medak	Andole	Andole
882	Telangana	Medak	Andole	Alladurg
883	Telangana	Medak	Andole	Regode
884	Telangana	Medak	Andole	Tekmal
885	Telangana	Medak	Andole	Raikode
886	Telangana	Medak	Andole	Munipally
887	Telangana	Medak	Andole	Pulkal
888	Telangana	Medak	Andole	Vatpally
889	Telangana	Medak	Narsapur	Narsapur
890	Telangana	Medak	Narsapur	Kulcharam
891	Telangana	Medak	Narsapur	Yeldurthy
892	Telangana	Medak	Narsapur	Shivampet
893	Telangana	Medak	Narsapur	Kowdipally
894	Telangana	Medak	Narsapur	Chilipched
895	Telangana	Medak	Patancheru	Patancheru
896	Telangana	Medak	Patancheru	Ameenpur
898	Telangana	Medak	Patancheru	Gummadidala
899	Telangana	Medak	Patancheru	Ramachandrapuram
900	Telangana	Medak	Sangareddy	Sangareddy
901	Telangana	Medak	Sangareddy	Kondapur
902	Telangana	Medak	Sangareddy	Sadasivpet
903	Telangana	Medak	Sangareddy	Kandi
904	Telangana	Medak	Gajwel	Gajwel
905	Telangana	Medak	Gajwel	Toopran
906	Telangana	Medak	Gajwel	Kondapak
907	Telangana	Medak	Gajwel	Wargal
908	Telangana	Medak	Gajwel	Mulug
909	Telangana	Medak	Gajwel	Jagdevpur
910	Telangana	Medak	Gajwel	Markook
911	Telangana	Medak	Dubbak	Dubbak
912	Telangana	Medak	Dubbak	Mirdoddi
913	Telangana	Medak	Dubbak	Doultabad
914	Telangana	Medak	Dubbak	Chegunta
915	Telangana	Medak	Dubbak	Thoguta
916	Telangana	Medak	Dubbak	Rayapole
917	Telangana	Ranga Reddy	Quthbullapur	Quthbullapur
918	Telangana	Ranga Reddy	Quthbullapur	Nizampet
919	Telangana	Ranga Reddy	Quthbullapur	Gajularamaram
920	Telangana	Ranga Reddy	Malkajgiri	Malkajgiri
921	Telangana	Ranga Reddy	Malkajgiri	Alwal
922	Telangana	Ranga Reddy	Uppal	Uppal
923	Telangana	Ranga Reddy	Uppal	Kapra
924	Telangana	Ranga Reddy	L.B. Nagar	L.B. Nagar
925	Telangana	Ranga Reddy	L.B. Nagar	Saroornagar
926	Telangana	Ranga Reddy	Maheswaram	Maheswaram
927	Telangana	Ranga Reddy	Maheswaram	Kandukur
928	Telangana	Ranga Reddy	Maheswaram	Tukkuguda
929	Telangana	Ranga Reddy	Rajendranagar	Rajendranagar
930	Telangana	Ranga Reddy	Rajendranagar	Gandipet
931	Telangana	Ranga Reddy	Rajendranagar	Shamshabad
932	Telangana	Ranga Reddy	Serilingampally	Serilingampally
933	Telangana	Ranga Reddy	Chevella	Chevella
934	Telangana	Ranga Reddy	Chevella	Moinabad
935	Telangana	Ranga Reddy	Chevella	Shabad
936	Telangana	Ranga Reddy	Chevella	Shankarpalle
937	Telangana	Ranga Reddy	Chevella	Nawabpet
938	Telangana	Ranga Reddy	Pargi	Pargi
939	Telangana	Ranga Reddy	Pargi	Doma
940	Telangana	Ranga Reddy	Pargi	Kulkacherla
941	Telangana	Ranga Reddy	Pargi	Pudur
942	Telangana	Ranga Reddy	Pargi	Chowdapur
943	Telangana	Ranga Reddy	Vikarabad	Vikarabad
944	Telangana	Ranga Reddy	Vikarabad	Marpalle
945	Telangana	Ranga Reddy	Vikarabad	Mominpet
946	Telangana	Ranga Reddy	Vikarabad	Dharur
947	Telangana	Ranga Reddy	Vikarabad	Bantwaram
948	Telangana	Ranga Reddy	Vikarabad	Kotepally
949	Telangana	Ranga Reddy	Tandur	Tandur
950	Telangana	Ranga Reddy	Tandur	Peddemul
951	Telangana	Ranga Reddy	Tandur	Basheerabad
952	Telangana	Ranga Reddy	Tandur	Yalal
953	Telangana	Ranga Reddy	Ibrahimpatnam	Ibrahimpatnam
954	Telangana	Ranga Reddy	Ibrahimpatnam	Manchal
955	Telangana	Ranga Reddy	Ibrahimpatnam	Yacharam
956	Telangana	Ranga Reddy	Ibrahimpatnam	Abdullapurmet
957	Telangana	Hyderabad	Musheerabad	Musheerabad
958	Telangana	Hyderabad	Malakpet	Malakpet
959	Telangana	Hyderabad	Amberpet	Amberpet
960	Telangana	Hyderabad	Khairatabad	Khairatabad
961	Telangana	Hyderabad	Jubilee Hills	Jubilee Hills
962	Telangana	Hyderabad	Jubilee Hills	Shaikpet
963	Telangana	Hyderabad	Sanathnagar	Sanathnagar
964	Telangana	Hyderabad	Sanathnagar	Ameerpet
965	Telangana	Hyderabad	Nampally	Nampally
966	Telangana	Hyderabad	Secunderabad	Secunderabad
967	Telangana	Hyderabad	Secunderabad Cantonment	Marredpally
968	Telangana	Hyderabad	Secunderabad Cantonment	Trimulgherry
969	Telangana	Hyderabad	Karwan	Karwan
970	Telangana	Hyderabad	Goshamahal	Goshamahal
971	Telangana	Hyderabad	Charminar	Charminar
972	Telangana	Hyderabad	Chandrayangutta	Chandrayangutta
973	Telangana	Hyderabad	Chandrayangutta	Bandlaguda
974	Telangana	Hyderabad	Yakutpura	Yakutpura
975	Telangana	Hyderabad	Yakutpura	Santoshnagar
976	Telangana	Hyderabad	Yakutpura	Rain Bazar
977	Telangana	Hyderabad	Bahadurpura	Bahadurpura
978	Telangana	Mahabubnagar	Kodangal	Kodangal
979	Telangana	Mahabubnagar	Kodangal	Bomraspet
980	Telangana	Mahabubnagar	Kodangal	Doulthabad
981	Telangana	Mahabubnagar	Kodangal	Kosgi
982	Telangana	Mahabubnagar	Kodangal	Maddur
983	Telangana	Mahabubnagar	Narayanpet	Narayanpet
984	Telangana	Mahabubnagar	Narayanpet	Damaragidda
985	Telangana	Mahabubnagar	Narayanpet	Dhanwada
986	Telangana	Mahabubnagar	Narayanpet	Utkoor
987	Telangana	Mahabubnagar	Narayanpet	Krishna
988	Telangana	Mahabubnagar	Narayanpet	Marikal
989	Telangana	Mahabubnagar	Mahbubnagar	Mahbubnagar Urban
990	Telangana	Mahabubnagar	Mahbubnagar	Mahbubnagar Rural
991	Telangana	Mahabubnagar	Mahbubnagar	Hanwada
992	Telangana	Mahabubnagar	Jadcherla	Jadcherla
993	Telangana	Mahabubnagar	Jadcherla	Nawabpet
994	Telangana	Mahabubnagar	Jadcherla	Balanagar
995	Telangana	Mahabubnagar	Jadcherla	Midjil
996	Telangana	Mahabubnagar	Devarkadra	Devarkadra
997	Telangana	Mahabubnagar	Devarkadra	Addakal
998	Telangana	Mahabubnagar	Devarkadra	Bhootpur
999	Telangana	Mahabubnagar	Devarkadra	Chinnachintakunta
1000	Telangana	Mahabubnagar	Devarkadra	Kothakota
1001	Telangana	Mahabubnagar	Devarkadra	Madanapur
1002	Telangana	Mahabubnagar	Devarkadra	Musapet
1003	Telangana	Mahabubnagar	Makthal	Makthal
1004	Telangana	Mahabubnagar	Makthal	Maganoor
1005	Telangana	Mahabubnagar	Makthal	Atmakur
1006	Telangana	Mahabubnagar	Makthal	Narva
1007	Telangana	Mahabubnagar	Makthal	Utkoor
1008	Telangana	Mahabubnagar	Makthal	Krishna
1009	Telangana	Mahabubnagar	Wanaparthy	Wanaparthy
1010	Telangana	Mahabubnagar	Wanaparthy	Pebbair
1011	Telangana	Mahabubnagar	Wanaparthy	Gopalpeta
1012	Telangana	Mahabubnagar	Wanaparthy	Peddamandadi
1013	Telangana	Mahabubnagar	Wanaparthy	Ghanpur
1014	Telangana	Mahabubnagar	Wanaparthy	Revally
1015	Telangana	Mahabubnagar	Gadwal	Gadwal
1016	Telangana	Mahabubnagar	Gadwal	Maldakal
1017	Telangana	Mahabubnagar	Gadwal	Ghattu
1018	Telangana	Mahabubnagar	Gadwal	Dharur
1019	Telangana	Mahabubnagar	Gadwal	K.T. Doddi
1020	Telangana	Mahabubnagar	Alampur	Alampur
1021	Telangana	Mahabubnagar	Alampur	Ieeja
1022	Telangana	Mahabubnagar	Alampur	Itikyal
1023	Telangana	Mahabubnagar	Alampur	Waddepalle
1024	Telangana	Mahabubnagar	Alampur	Manopad
1025	Telangana	Mahabubnagar	Alampur	Rajoli
1026	Telangana	Mahabubnagar	Nagarkurnool	Nagarkurnool
1027	Telangana	Mahabubnagar	Nagarkurnool	Bijinapally
1028	Telangana	Mahabubnagar	Nagarkurnool	Tadoor
1029	Telangana	Mahabubnagar	Nagarkurnool	Telkapally
1030	Telangana	Mahabubnagar	Nagarkurnool	Thimmajipet
1031	Telangana	Mahabubnagar	Achampet	Achampet
1032	Telangana	Mahabubnagar	Achampet	Uppununthala
1033	Telangana	Mahabubnagar	Achampet	Amrabad
1034	Telangana	Mahabubnagar	Achampet	Balmoor
1035	Telangana	Mahabubnagar	Achampet	Lingal
1036	Telangana	Mahabubnagar	Achampet	Vangoor
1037	Telangana	Mahabubnagar	Kalwakurthy	Kalwakurthy
1038	Telangana	Mahabubnagar	Kalwakurthy	Veldanda
1039	Telangana	Mahabubnagar	Kalwakurthy	Talakondapalle
1040	Telangana	Mahabubnagar	Kalwakurthy	Amangal
1041	Telangana	Mahabubnagar	Kalwakurthy	Madgul
1042	Telangana	Mahabubnagar	Kalwakurthy	Charakonda
1043	Telangana	Mahabubnagar	Shadnagar	Shadnagar
1044	Telangana	Mahabubnagar	Shadnagar	Farooqnagar
1045	Telangana	Mahabubnagar	Shadnagar	Kothur
1046	Telangana	Mahabubnagar	Shadnagar	Keshampet
1047	Telangana	Mahabubnagar	Shadnagar	Kondurg
1048	Telangana	Mahabubnagar	Shadnagar	Chaudderpally
1049	Telangana	Mahabubnagar	Kollapur	Kollapur
1050	Telangana	Mahabubnagar	Kollapur	Kodair
1051	Telangana	Mahabubnagar	Kollapur	Pangal
1052	Telangana	Mahabubnagar	Kollapur	Veepangandla
1053	Telangana	Nalgonda	Devarakonda	Devarakonda
1054	Telangana	Nalgonda	Devarakonda	Chintapalle
1055	Telangana	Nalgonda	Devarakonda	Gundlapalle
1056	Telangana	Nalgonda	Devarakonda	Chandampet
1057	Telangana	Nalgonda	Devarakonda	Konda Mallepally
1058	Telangana	Nalgonda	Nagarjuna Sagar	Nidamanur
1059	Telangana	Nalgonda	Nagarjuna Sagar	Gurrampode
1060	Telangana	Nalgonda	Nagarjuna Sagar	Peddavoora
1061	Telangana	Nalgonda	Nagarjuna Sagar	Anumula
1062	Telangana	Nalgonda	Nagarjuna Sagar	Tripuraram
1063	Telangana	Nalgonda	Nagarjuna Sagar	Thirumalagiri Sagar
1064	Telangana	Nalgonda	Miryalaguda	Miryalaguda
1065	Telangana	Nalgonda	Miryalaguda	Vemulapally
1066	Telangana	Nalgonda	Miryalaguda	Dameracherla
1067	Telangana	Nalgonda	Huzurnagar	Huzurnagar
1068	Telangana	Nalgonda	Huzurnagar	Mattampally
1069	Telangana	Nalgonda	Huzurnagar	Mellachervu
1070	Telangana	Nalgonda	Huzurnagar	Garidepally
1071	Telangana	Nalgonda	Huzurnagar	Chintalapalem
1072	Telangana	Nalgonda	Kodad	Kodad
1073	Telangana	Nalgonda	Kodad	Mothey
1074	Telangana	Nalgonda	Kodad	Nadikuda
1075	Telangana	Nalgonda	Kodad	Munagala
1076	Telangana	Nalgonda	Kodad	Chilkur
1077	Telangana	Nalgonda	Suryapet	Suryapet
1078	Telangana	Nalgonda	Suryapet	Chivvemla
1079	Telangana	Nalgonda	Suryapet	Penpahad
1080	Telangana	Nalgonda	Suryapet	Atmakur (S)
1081	Telangana	Nalgonda	Nalgonda	Nalgonda
1082	Telangana	Nalgonda	Nalgonda	Thipparthy
1083	Telangana	Nalgonda	Nalgonda	Kanagal
1084	Telangana	Nalgonda	Nalgonda	Madugulapally
1085	Telangana	Nalgonda	Munugode	Munugode
1086	Telangana	Nalgonda	Munugode	Chandur
1087	Telangana	Nalgonda	Munugode	Marriguda
1088	Telangana	Nalgonda	Munugode	Nampally
1089	Telangana	Nalgonda	Munugode	Narayanapur
1090	Telangana	Nalgonda	Munugode	Choutuppal
1091	Telangana	Nalgonda	Bhongir	Bhongir
1092	Telangana	Nalgonda	Bhongir	Bibinagar
1093	Telangana	Nalgonda	Bhongir	Bhoodan Pochampally
1094	Telangana	Nalgonda	Bhongir	Valigonda
1095	Telangana	Nalgonda	Nakrekal	Nakrekal
1096	Telangana	Nalgonda	Nakrekal	Kethepally
1097	Telangana	Nalgonda	Nakrekal	Kattangur
1098	Telangana	Nalgonda	Nakrekal	Chityal
1099	Telangana	Nalgonda	Nakrekal	Ramannapeta
1100	Telangana	Nalgonda	Nakrekal	Narketpally
1101	Telangana	Nalgonda	Thungathurthy	Thungathurthy
1102	Telangana	Nalgonda	Thungathurthy	Thirumalagiri
1103	Telangana	Nalgonda	Thungathurthy	Nuthankal
1104	Telangana	Nalgonda	Thungathurthy	Jajireddigudem
1105	Telangana	Nalgonda	Thungathurthy	Sali Gouraram
1106	Telangana	Nalgonda	Thungathurthy	Mothkur
1107	Telangana	Nalgonda	Thungathurthy	Addagudur
1108	Telangana	Nalgonda	Thungathurthy	Maddirala
1109	Telangana	Warangal	Palakurthi	Palakurthi
1110	Telangana	Warangal	Palakurthi	Devaruppula
1111	Telangana	Warangal	Palakurthi	Kodakandla
1112	Telangana	Warangal	Palakurthi	Raiparthy
1113	Telangana	Warangal	Palakurthi	Thorrrur
1114	Telangana	Warangal	Ghanpur (Station)	Ghanpur (Station)
1115	Telangana	Warangal	Ghanpur (Station)	Dharmasagar
1116	Telangana	Warangal	Ghanpur (Station)	Raghunathpalle
1117	Telangana	Warangal	Ghanpur (Station)	Zaffergadh
1118	Telangana	Warangal	Ghanpur (Station)	Lingala Ghanpur
1119	Telangana	Warangal	Jangaon	Jangaon
1120	Telangana	Warangal	Jangaon	Cherial
1121	Telangana	Warangal	Jangaon	Bachannapet
1122	Telangana	Warangal	Jangaon	Narmetta
1123	Telangana	Warangal	Jangaon	Maddur
1124	Telangana	Warangal	Wardhannapet	Wardhannapet
1125	Telangana	Warangal	Wardhannapet	Hanamkonda
1126	Telangana	Warangal	Wardhannapet	Parvathagiri
1127	Telangana	Warangal	Wardhannapet	Hasanparthy
1128	Telangana	Warangal	Bhupalpalle	Bhupalpalle
1129	Telangana	Warangal	Bhupalpalle	Ghanpur (Mulug)
1130	Telangana	Warangal	Bhupalpalle	Regonda
1131	Telangana	Warangal	Bhupalpalle	Mogullapalle
1132	Telangana	Warangal	Bhupalpalle	Chityal
1133	Telangana	Warangal	Mulug	Mulug
1134	Telangana	Warangal	Mulug	Venkatapur
1135	Telangana	Warangal	Mulug	Govindaraopet
1136	Telangana	Warangal	Mulug	Tadvai
1137	Telangana	Warangal	Mulug	Eturnagaram
1138	Telangana	Warangal	Mulug	Mangapet
1139	Telangana	Warangal	Mulug	S.S. Tadwai
1140	Telangana	Warangal	Dornakal	Dornakal
1141	Telangana	Warangal	Dornakal	Kuravi
1142	Telangana	Warangal	Dornakal	Maripeda
1143	Telangana	Warangal	Dornakal	Narsimhulapet
1144	Telangana	Warangal	Mahabubabad	Mahabubabad
1145	Telangana	Warangal	Mahabubabad	Kesamudram
1146	Telangana	Warangal	Mahabubabad	Nellikudur
1147	Telangana	Warangal	Mahabubabad	Gudur
1148	Telangana	Warangal	Narsampet	Narsampet
1149	Telangana	Warangal	Narsampet	Chennaraopet
1150	Telangana	Warangal	Narsampet	Duggondi
1151	Telangana	Warangal	Narsampet	Nekkonda
1152	Telangana	Warangal	Narsampet	Khanapur
1153	Telangana	Warangal	Narsampet	Nallabelly
1154	Telangana	Warangal	Parkal	Parkal
1155	Telangana	Warangal	Parkal	Atmakur
1156	Telangana	Warangal	Parkal	Sangam
1157	Telangana	Warangal	Parkal	Geesugonda
1158	Telangana	Warangal	Parkal	Nadikuda
1159	Telangana	Warangal	Warangal West	Warangal (Part)
1160	Telangana	Warangal	Warangal West	Hanamkonda (Part)
1161	Telangana	Warangal	Warangal East	Warangal (Part)
1162	Telangana	Khammam	Kothagudem	Kothagudem
1163	Telangana	Khammam	Kothagudem	Palwancha
1164	Telangana	Khammam	Kothagudem	Sujatanagar
1165	Telangana	Khammam	Kothagudem	Chunchupally
1166	Telangana	Khammam	Aswaraopeta	Aswaraopeta
1167	Telangana	Khammam	Aswaraopeta	Dammapeta
1168	Telangana	Khammam	Aswaraopeta	Mulakalapalle
1169	Telangana	Khammam	Aswaraopeta	Chandrugonda
1170	Telangana	Khammam	Bhadrachalam	Bhadrachalam
1171	Telangana	Khammam	Bhadrachalam	Wazeed
1172	Telangana	Khammam	Bhadrachalam	Venkatapuram
1173	Telangana	Khammam	Bhadrachalam	Cherla
1174	Telangana	Khammam	Bhadrachalam	Dummugudem
1175	Telangana	Khammam	Khammam	Khammam Urban
1176	Telangana	Khammam	Khammam	Khammam Rural
1177	Telangana	Khammam	Palair	Khammam Rural (Part)
1178	Telangana	Khammam	Palair	Kusumanchi
1179	Telangana	Khammam	Palair	Thirumalayapalem
1180	Telangana	Khammam	Palair	Nelakondapalle
1181	Telangana	Khammam	Madhira	Madhira
1182	Telangana	Khammam	Madhira	Bonakal
1183	Telangana	Khammam	Madhira	Chintakani
1184	Telangana	Khammam	Madhira	Mudigonda
1185	Telangana	Khammam	Madhira	Yerrupalem
1186	Telangana	Khammam	Wyra	Wyra
1187	Telangana	Khammam	Wyra	Enkoor
1188	Telangana	Khammam	Wyra	Konijerla
1189	Telangana	Khammam	Wyra	Singareni
1190	Telangana	Khammam	Wyra	Julurpad
1191	Telangana	Khammam	Sathupalli	Sathupalli
1192	Telangana	Khammam	Sathupalli	Penuballi
1193	Telangana	Khammam	Sathupalli	Kallur
1194	Telangana	Khammam	Sathupalli	Thallada
1195	Telangana	Khammam	Sathupalli	Vemsoor
1196	Telangana	Khammam	Yellandu	Yellandu
1197	Telangana	Khammam	Yellandu	Kamepalle
1198	Telangana	Khammam	Yellandu	Bayyaram
1199	Telangana	Khammam	Yellandu	Tekulapalle
1200	Telangana	Khammam	Pinapaka	Pinapaka
1201	Telangana	Khammam	Pinapaka	Manuguru
1202	Telangana	Khammam	Pinapaka	Gundala
1203	Telangana	Khammam	Pinapaka	Burgampahad
1204	Telangana	Khammam	Pinapaka	Aswapuram
1215	Kerala	N/A	N/A	N/A
1216	Kerala	kerala district	N/A	N/A
1217	Kerala	kerala district	kerala constituency	N/A
1218	Kerala	kerala district	kerala constituency	kerala mandal
\.


--
-- Data for Name: ads; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.ads (id, image_url, text, link, start_date, end_date, run_mode, target_locations, created_at) FROM stdin;
5	https://ik.imagekit.io/m4x8t3fcwv/ads/ad_1772002874220_RzWjy4pHY.jpg	DJI drone..!	www.dwaith.com	2026-02-25	2026-03-04	all	[{"id": 1772002863206, "name": "uppal", "type": "radius", "radius": 5, "region": "Full Country", "targetingLabel": "5km"}]	2026-02-25 07:01:15.74005
\.


--
-- Data for Name: constituencies; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.constituencies (id, district_id, name) FROM stdin;
\.


--
-- Data for Name: districts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.districts (id, state_id, name) FROM stdin;
\.


--
-- Data for Name: feedbacks; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.feedbacks (id, user_id, message, "timestamp") FROM stdin;
\.


--
-- Data for Name: mandals; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.mandals (id, constituency_id, name) FROM stdin;
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.notifications (id, title, message, is_scheduled, scheduled_at, status, target_user_id, created_at) FROM stdin;
1	Test 1	Notification test 1	f	\N	sent	\N	2026-02-24 13:52:35.752539
\.


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.posts (id, user_id, message, post_images, post_videos, likes_count, "timestamp") FROM stdin;
\.


--
-- Data for Name: states; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.states (id, name) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, username, email, password, name, mobile, photo_url, bio, state, district, constituency, mandal, village, selected_category, setup_completed, role, created_at, updated_at, selected_city, device_id) FROM stdin;
27	banukakalyan	banukakalyan@gmail.com	$2b$10$yVoXmov.KpTiSCw/3LTTrecF3XQtYvwOX9SeLJyLCvYfPPMO5HoMW	kalyan chakravarthi	8179792568	data:image/jpeg;base64,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	\N	Telangana	Hyderabad	Sanathnagar	Sanathnagar	village		t	user	2026-02-27 07:10:58.109294	2026-02-27 07:12:30.179652		48038636-f152-4929-a12d-a1f93e5a1f81
8	dwaithdev	dwaith.dev@gmail.com	$2b$10$1MAqw30sR.rl42XI8A7c5uflOX7rwc3rWmsA84wpliKMKVETm5xUO	Dwaith Dev	\N	\N	\N	\N	\N	\N	\N	\N	\N	t	admin	2026-02-24 11:08:02.54012	2026-02-24 11:08:02.54012	\N	\N
26	test1	test1@gmail.com	$2b$10$MWVuzTYEW0drQDu3QzWraeZUA7bYkm0lDJ/TGExPsMovBHDb90zuy	Test user 1 	\N	\N	\N	\N	\N	\N	\N	\N	\N	t	user	2026-02-27 07:07:09.37947	2026-02-27 07:07:37.939003	\N	7db3d7fb-ce1d-491d-be1b-86f1a9c89d29
\.


--
-- Data for Name: villages; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.villages (id, mandal_id, name) FROM stdin;
\.


--
-- Name: admin_masterdata_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.admin_masterdata_category_id_seq', 6, true);


--
-- Name: admin_masterdata_city_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.admin_masterdata_city_id_seq', 126, true);


--
-- Name: admin_masterdata_location_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.admin_masterdata_location_id_seq', 1218, true);


--
-- Name: ads_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.ads_id_seq', 5, true);


--
-- Name: constituencies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.constituencies_id_seq', 1, false);


--
-- Name: districts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.districts_id_seq', 1, false);


--
-- Name: feedbacks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.feedbacks_id_seq', 2, true);


--
-- Name: mandals_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.mandals_id_seq', 1, false);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.notifications_id_seq', 1, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 9, true);


--
-- Name: states_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.states_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 27, true);


--
-- Name: villages_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.villages_id_seq', 1, false);


--
-- Name: admin_masterdata_category admin_masterdata_category_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_masterdata_category
    ADD CONSTRAINT admin_masterdata_category_name_key UNIQUE (name);


--
-- Name: admin_masterdata_category admin_masterdata_category_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_masterdata_category
    ADD CONSTRAINT admin_masterdata_category_pkey PRIMARY KEY (id);


--
-- Name: admin_masterdata_city admin_masterdata_city_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_masterdata_city
    ADD CONSTRAINT admin_masterdata_city_name_key UNIQUE (name);


--
-- Name: admin_masterdata_city admin_masterdata_city_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_masterdata_city
    ADD CONSTRAINT admin_masterdata_city_pkey PRIMARY KEY (id);


--
-- Name: admin_masterdata_location admin_masterdata_location_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.admin_masterdata_location
    ADD CONSTRAINT admin_masterdata_location_pkey PRIMARY KEY (id);


--
-- Name: ads ads_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ads
    ADD CONSTRAINT ads_pkey PRIMARY KEY (id);


--
-- Name: constituencies constituencies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.constituencies
    ADD CONSTRAINT constituencies_pkey PRIMARY KEY (id);


--
-- Name: districts districts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.districts
    ADD CONSTRAINT districts_pkey PRIMARY KEY (id);


--
-- Name: feedbacks feedbacks_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_pkey PRIMARY KEY (id);


--
-- Name: mandals mandals_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mandals
    ADD CONSTRAINT mandals_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: states states_name_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_name_key UNIQUE (name);


--
-- Name: states states_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_mobile_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_mobile_key UNIQUE (mobile);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: villages villages_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.villages
    ADD CONSTRAINT villages_pkey PRIMARY KEY (id);


--
-- Name: idx_feedbacks_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_feedbacks_user_id ON public.feedbacks USING btree (user_id);


--
-- Name: idx_posts_user_id; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_posts_user_id ON public.posts USING btree (user_id);


--
-- Name: idx_users_email; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX idx_users_email ON public.users USING btree (email);


--
-- Name: constituencies constituencies_district_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.constituencies
    ADD CONSTRAINT constituencies_district_id_fkey FOREIGN KEY (district_id) REFERENCES public.districts(id);


--
-- Name: districts districts_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.districts
    ADD CONSTRAINT districts_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.states(id);


--
-- Name: feedbacks feedbacks_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT feedbacks_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: mandals mandals_constituency_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.mandals
    ADD CONSTRAINT mandals_constituency_id_fkey FOREIGN KEY (constituency_id) REFERENCES public.constituencies(id);


--
-- Name: notifications notifications_target_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_target_user_id_fkey FOREIGN KEY (target_user_id) REFERENCES public.users(id);


--
-- Name: posts posts_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: villages villages_mandal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.villages
    ADD CONSTRAINT villages_mandal_id_fkey FOREIGN KEY (mandal_id) REFERENCES public.mandals(id);


--
-- PostgreSQL database dump complete
--

\unrestrict dGQnIzSJPnDBouAcxufd0b5hBEPHnBqGf0evd2Osi8u4Ug6GLjQgbns6yLwgjWo

