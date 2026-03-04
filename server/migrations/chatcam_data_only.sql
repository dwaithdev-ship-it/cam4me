--
-- PostgreSQL database dump
--

\restrict I2CQ2cY9kfPCqwisDNmQZpAtgen2bqXQcPScnSLiwAYYRKFss7z7Reopgou0WgH

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

--
-- Data for Name: admin_masterdata_category; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.admin_masterdata_category VALUES (1, 'Cameras & drone');
INSERT INTO public.admin_masterdata_category VALUES (2, 'Video editing & Album design');
INSERT INTO public.admin_masterdata_category VALUES (3, 'Printing lab');
INSERT INTO public.admin_masterdata_category VALUES (4, 'Human Resources');
INSERT INTO public.admin_masterdata_category VALUES (6, 'Events');


--
-- Data for Name: admin_masterdata_city; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.admin_masterdata_city VALUES (1, 'Adilabad');
INSERT INTO public.admin_masterdata_city VALUES (2, 'Adoni');
INSERT INTO public.admin_masterdata_city VALUES (3, 'Alwal');
INSERT INTO public.admin_masterdata_city VALUES (4, 'Amalapuram');
INSERT INTO public.admin_masterdata_city VALUES (5, 'Anakapalle');
INSERT INTO public.admin_masterdata_city VALUES (6, 'Anantapur');
INSERT INTO public.admin_masterdata_city VALUES (7, 'Armur');
INSERT INTO public.admin_masterdata_city VALUES (8, 'Bapatla');
INSERT INTO public.admin_masterdata_city VALUES (9, 'Bellampalli');
INSERT INTO public.admin_masterdata_city VALUES (10, 'Bhadrachalam');
INSERT INTO public.admin_masterdata_city VALUES (11, 'Bhimavaram');
INSERT INTO public.admin_masterdata_city VALUES (12, 'Bhongir');
INSERT INTO public.admin_masterdata_city VALUES (13, 'Bobbili');
INSERT INTO public.admin_masterdata_city VALUES (14, 'Bodhan');
INSERT INTO public.admin_masterdata_city VALUES (15, 'Chilakaluripet');
INSERT INTO public.admin_masterdata_city VALUES (16, 'Chirala');
INSERT INTO public.admin_masterdata_city VALUES (17, 'Chittoor');
INSERT INTO public.admin_masterdata_city VALUES (18, 'Dasnapur');
INSERT INTO public.admin_masterdata_city VALUES (19, 'Devarakonda');
INSERT INTO public.admin_masterdata_city VALUES (20, 'Dharmavaram');
INSERT INTO public.admin_masterdata_city VALUES (21, 'Eluru');
INSERT INTO public.admin_masterdata_city VALUES (22, 'Farooqnagar');
INSERT INTO public.admin_masterdata_city VALUES (23, 'Gadwal');
INSERT INTO public.admin_masterdata_city VALUES (24, 'Gajuwaka');
INSERT INTO public.admin_masterdata_city VALUES (25, 'Gudivada');
INSERT INTO public.admin_masterdata_city VALUES (26, 'Gudur');
INSERT INTO public.admin_masterdata_city VALUES (27, 'Guntakal');
INSERT INTO public.admin_masterdata_city VALUES (28, 'Guntur');
INSERT INTO public.admin_masterdata_city VALUES (29, 'Hindupur');
INSERT INTO public.admin_masterdata_city VALUES (30, 'Hyderabad');
INSERT INTO public.admin_masterdata_city VALUES (31, 'Ichchapuram');
INSERT INTO public.admin_masterdata_city VALUES (32, 'Jagtial');
INSERT INTO public.admin_masterdata_city VALUES (33, 'Jammalamadugu');
INSERT INTO public.admin_masterdata_city VALUES (34, 'Jangaon');
INSERT INTO public.admin_masterdata_city VALUES (35, 'Kadapa');
INSERT INTO public.admin_masterdata_city VALUES (36, 'Kadiam');
INSERT INTO public.admin_masterdata_city VALUES (37, 'Kagaznagar');
INSERT INTO public.admin_masterdata_city VALUES (38, 'Kakinada');
INSERT INTO public.admin_masterdata_city VALUES (39, 'Kamareddy');
INSERT INTO public.admin_masterdata_city VALUES (40, 'Kandukur');
INSERT INTO public.admin_masterdata_city VALUES (41, 'Kapra');
INSERT INTO public.admin_masterdata_city VALUES (42, 'Karimnagar');
INSERT INTO public.admin_masterdata_city VALUES (43, 'Kavali');
INSERT INTO public.admin_masterdata_city VALUES (44, 'Khammam');
INSERT INTO public.admin_masterdata_city VALUES (45, 'Koratla');
INSERT INTO public.admin_masterdata_city VALUES (46, 'Kothagudem');
INSERT INTO public.admin_masterdata_city VALUES (47, 'Kothapeta');
INSERT INTO public.admin_masterdata_city VALUES (48, 'Kovvur');
INSERT INTO public.admin_masterdata_city VALUES (49, 'Kurnool');
INSERT INTO public.admin_masterdata_city VALUES (50, 'Kyathampalle');
INSERT INTO public.admin_masterdata_city VALUES (51, 'L.B. Nagar');
INSERT INTO public.admin_masterdata_city VALUES (52, 'Macherla');
INSERT INTO public.admin_masterdata_city VALUES (53, 'Machilipatnam');
INSERT INTO public.admin_masterdata_city VALUES (54, 'Madanapalle');
INSERT INTO public.admin_masterdata_city VALUES (55, 'Mahbubnagar');
INSERT INTO public.admin_masterdata_city VALUES (56, 'Malkajgiri');
INSERT INTO public.admin_masterdata_city VALUES (57, 'Mancherial');
INSERT INTO public.admin_masterdata_city VALUES (58, 'Mandamarri');
INSERT INTO public.admin_masterdata_city VALUES (59, 'Mangalagiri');
INSERT INTO public.admin_masterdata_city VALUES (60, 'Manuguru');
INSERT INTO public.admin_masterdata_city VALUES (61, 'Markapur');
INSERT INTO public.admin_masterdata_city VALUES (62, 'Medak');
INSERT INTO public.admin_masterdata_city VALUES (63, 'Meerpet');
INSERT INTO public.admin_masterdata_city VALUES (64, 'Miryalaguda');
INSERT INTO public.admin_masterdata_city VALUES (65, 'Nagari');
INSERT INTO public.admin_masterdata_city VALUES (66, 'Nagarkurnool');
INSERT INTO public.admin_masterdata_city VALUES (67, 'Nalgonda');
INSERT INTO public.admin_masterdata_city VALUES (68, 'Nandyal');
INSERT INTO public.admin_masterdata_city VALUES (69, 'Narasapur');
INSERT INTO public.admin_masterdata_city VALUES (70, 'Narasaraopet');
INSERT INTO public.admin_masterdata_city VALUES (71, 'Narsipatnam');
INSERT INTO public.admin_masterdata_city VALUES (72, 'Nellore');
INSERT INTO public.admin_masterdata_city VALUES (73, 'Nirmal');
INSERT INTO public.admin_masterdata_city VALUES (74, 'Nizamabad');
INSERT INTO public.admin_masterdata_city VALUES (75, 'Nuzvid');
INSERT INTO public.admin_masterdata_city VALUES (76, 'Ongole');
INSERT INTO public.admin_masterdata_city VALUES (77, 'Palacole');
INSERT INTO public.admin_masterdata_city VALUES (78, 'Palwancha');
INSERT INTO public.admin_masterdata_city VALUES (79, 'Piduguralla');
INSERT INTO public.admin_masterdata_city VALUES (80, 'Pithapuram');
INSERT INTO public.admin_masterdata_city VALUES (81, 'Ponnur');
INSERT INTO public.admin_masterdata_city VALUES (82, 'Proddatur');
INSERT INTO public.admin_masterdata_city VALUES (83, 'Punganur');
INSERT INTO public.admin_masterdata_city VALUES (84, 'Puttur');
INSERT INTO public.admin_masterdata_city VALUES (85, 'Quthbullapur');
INSERT INTO public.admin_masterdata_city VALUES (86, 'Rajahmundry');
INSERT INTO public.admin_masterdata_city VALUES (87, 'Rajampet');
INSERT INTO public.admin_masterdata_city VALUES (88, 'Rajendranagar');
INSERT INTO public.admin_masterdata_city VALUES (89, 'Ramachandrapuram');
INSERT INTO public.admin_masterdata_city VALUES (90, 'Ramagundam');
INSERT INTO public.admin_masterdata_city VALUES (91, 'Rayachoti');
INSERT INTO public.admin_masterdata_city VALUES (92, 'Rayadurg');
INSERT INTO public.admin_masterdata_city VALUES (93, 'Renigunta');
INSERT INTO public.admin_masterdata_city VALUES (94, 'Repalle');
INSERT INTO public.admin_masterdata_city VALUES (95, 'Sadasivpet');
INSERT INTO public.admin_masterdata_city VALUES (96, 'Salur');
INSERT INTO public.admin_masterdata_city VALUES (97, 'Samalkot');
INSERT INTO public.admin_masterdata_city VALUES (98, 'Sangareddy');
INSERT INTO public.admin_masterdata_city VALUES (99, 'Sattenapalle');
INSERT INTO public.admin_masterdata_city VALUES (100, 'Secunderabad');
INSERT INTO public.admin_masterdata_city VALUES (101, 'Serilingampally');
INSERT INTO public.admin_masterdata_city VALUES (102, 'Siddipet');
INSERT INTO public.admin_masterdata_city VALUES (103, 'Sircilla');
INSERT INTO public.admin_masterdata_city VALUES (104, 'Srikakulam');
INSERT INTO public.admin_masterdata_city VALUES (105, 'Srikalahasti');
INSERT INTO public.admin_masterdata_city VALUES (106, 'Suryapet');
INSERT INTO public.admin_masterdata_city VALUES (107, 'Tadepalligudem');
INSERT INTO public.admin_masterdata_city VALUES (108, 'Tadpatri');
INSERT INTO public.admin_masterdata_city VALUES (109, 'Tandur');
INSERT INTO public.admin_masterdata_city VALUES (110, 'Tanuku');
INSERT INTO public.admin_masterdata_city VALUES (111, 'Tenali');
INSERT INTO public.admin_masterdata_city VALUES (112, 'Tirupati');
INSERT INTO public.admin_masterdata_city VALUES (113, 'Tuni');
INSERT INTO public.admin_masterdata_city VALUES (114, 'Uppal');
INSERT INTO public.admin_masterdata_city VALUES (115, 'Venkatagiri');
INSERT INTO public.admin_masterdata_city VALUES (116, 'Vicarabad');
INSERT INTO public.admin_masterdata_city VALUES (117, 'Vijayawada');
INSERT INTO public.admin_masterdata_city VALUES (118, 'Vinukonda');
INSERT INTO public.admin_masterdata_city VALUES (119, 'Visakhapatnam');
INSERT INTO public.admin_masterdata_city VALUES (120, 'Vizianagaram');
INSERT INTO public.admin_masterdata_city VALUES (121, 'Wanaparthy');
INSERT INTO public.admin_masterdata_city VALUES (122, 'Warangal');
INSERT INTO public.admin_masterdata_city VALUES (123, 'Yemmiganur');
INSERT INTO public.admin_masterdata_city VALUES (124, 'Yerraguntla');
INSERT INTO public.admin_masterdata_city VALUES (125, 'Zahirabad');


--
-- Data for Name: admin_masterdata_location; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.admin_masterdata_location VALUES (1, 'Andhra Pradesh', 'Srikakulam', 'Ichchapuram', 'Ichchapuram');
INSERT INTO public.admin_masterdata_location VALUES (2, 'Andhra Pradesh', 'Srikakulam', 'Ichchapuram', 'Kanchili');
INSERT INTO public.admin_masterdata_location VALUES (3, 'Andhra Pradesh', 'Srikakulam', 'Ichchapuram', 'Kaviti');
INSERT INTO public.admin_masterdata_location VALUES (4, 'Andhra Pradesh', 'Srikakulam', 'Ichchapuram', 'Sompeta');
INSERT INTO public.admin_masterdata_location VALUES (5, 'Andhra Pradesh', 'Srikakulam', 'Palasa', 'Palasa');
INSERT INTO public.admin_masterdata_location VALUES (6, 'Andhra Pradesh', 'Srikakulam', 'Palasa', 'Mandasa');
INSERT INTO public.admin_masterdata_location VALUES (7, 'Andhra Pradesh', 'Srikakulam', 'Palasa', 'Vajrapukotturu');
INSERT INTO public.admin_masterdata_location VALUES (8, 'Andhra Pradesh', 'Srikakulam', 'Tekkali', 'Tekkali');
INSERT INTO public.admin_masterdata_location VALUES (9, 'Andhra Pradesh', 'Srikakulam', 'Tekkali', 'Kotabommali');
INSERT INTO public.admin_masterdata_location VALUES (10, 'Andhra Pradesh', 'Srikakulam', 'Tekkali', 'Santhabommali');
INSERT INTO public.admin_masterdata_location VALUES (11, 'Andhra Pradesh', 'Srikakulam', 'Tekkali', 'Nandigam');
INSERT INTO public.admin_masterdata_location VALUES (12, 'Andhra Pradesh', 'Srikakulam', 'Pathapatnam', 'Pathapatnam');
INSERT INTO public.admin_masterdata_location VALUES (13, 'Andhra Pradesh', 'Srikakulam', 'Pathapatnam', 'Meliaputti');
INSERT INTO public.admin_masterdata_location VALUES (14, 'Andhra Pradesh', 'Srikakulam', 'Pathapatnam', 'L.N. Pet');
INSERT INTO public.admin_masterdata_location VALUES (15, 'Andhra Pradesh', 'Srikakulam', 'Pathapatnam', 'Kothur');
INSERT INTO public.admin_masterdata_location VALUES (16, 'Andhra Pradesh', 'Srikakulam', 'Pathapatnam', 'Hiramandalam');
INSERT INTO public.admin_masterdata_location VALUES (17, 'Andhra Pradesh', 'Srikakulam', 'Srikakulam', 'Srikakulam');
INSERT INTO public.admin_masterdata_location VALUES (18, 'Andhra Pradesh', 'Srikakulam', 'Srikakulam', 'Gara');
INSERT INTO public.admin_masterdata_location VALUES (19, 'Andhra Pradesh', 'Srikakulam', 'Amadalavalasa', 'Amadalavalasa');
INSERT INTO public.admin_masterdata_location VALUES (20, 'Andhra Pradesh', 'Srikakulam', 'Amadalavalasa', 'Ponduru');
INSERT INTO public.admin_masterdata_location VALUES (21, 'Andhra Pradesh', 'Srikakulam', 'Amadalavalasa', 'Sarubujjili');
INSERT INTO public.admin_masterdata_location VALUES (22, 'Andhra Pradesh', 'Srikakulam', 'Amadalavalasa', 'Burja');
INSERT INTO public.admin_masterdata_location VALUES (23, 'Andhra Pradesh', 'Srikakulam', 'Etcherla', 'Etcherla');
INSERT INTO public.admin_masterdata_location VALUES (24, 'Andhra Pradesh', 'Srikakulam', 'Etcherla', 'Laveru');
INSERT INTO public.admin_masterdata_location VALUES (25, 'Andhra Pradesh', 'Srikakulam', 'Etcherla', 'Ranastalam');
INSERT INTO public.admin_masterdata_location VALUES (26, 'Andhra Pradesh', 'Srikakulam', 'Etcherla', 'G. Sigadam');
INSERT INTO public.admin_masterdata_location VALUES (27, 'Andhra Pradesh', 'Srikakulam', 'Narasannapeta', 'Narasannapeta');
INSERT INTO public.admin_masterdata_location VALUES (28, 'Andhra Pradesh', 'Srikakulam', 'Narasannapeta', 'Jalumuru');
INSERT INTO public.admin_masterdata_location VALUES (29, 'Andhra Pradesh', 'Srikakulam', 'Narasannapeta', 'Polaki');
INSERT INTO public.admin_masterdata_location VALUES (30, 'Andhra Pradesh', 'Srikakulam', 'Narasannapeta', 'Saravakota');
INSERT INTO public.admin_masterdata_location VALUES (31, 'Andhra Pradesh', 'Srikakulam', 'Rajam', 'Rajam');
INSERT INTO public.admin_masterdata_location VALUES (32, 'Andhra Pradesh', 'Srikakulam', 'Rajam', 'Vangara');
INSERT INTO public.admin_masterdata_location VALUES (33, 'Andhra Pradesh', 'Srikakulam', 'Rajam', 'Regidi Amadalavalasa');
INSERT INTO public.admin_masterdata_location VALUES (34, 'Andhra Pradesh', 'Srikakulam', 'Rajam', 'Santhakaviti');
INSERT INTO public.admin_masterdata_location VALUES (35, 'Andhra Pradesh', 'Srikakulam', 'Palakonda', 'Palakonda');
INSERT INTO public.admin_masterdata_location VALUES (36, 'Andhra Pradesh', 'Srikakulam', 'Palakonda', 'Seethampeta');
INSERT INTO public.admin_masterdata_location VALUES (37, 'Andhra Pradesh', 'Srikakulam', 'Palakonda', 'Bhamini');
INSERT INTO public.admin_masterdata_location VALUES (38, 'Andhra Pradesh', 'Srikakulam', 'Palakonda', 'Veeraghattam');
INSERT INTO public.admin_masterdata_location VALUES (39, 'Andhra Pradesh', 'Vizianagaram', 'Kurupam', 'Kurupam');
INSERT INTO public.admin_masterdata_location VALUES (40, 'Andhra Pradesh', 'Vizianagaram', 'Kurupam', 'Gummalakshmipuram');
INSERT INTO public.admin_masterdata_location VALUES (41, 'Andhra Pradesh', 'Vizianagaram', 'Kurupam', 'Jiyyammavalasa');
INSERT INTO public.admin_masterdata_location VALUES (42, 'Andhra Pradesh', 'Vizianagaram', 'Kurupam', 'Komarada');
INSERT INTO public.admin_masterdata_location VALUES (43, 'Andhra Pradesh', 'Vizianagaram', 'Kurupam', 'Garugubilli');
INSERT INTO public.admin_masterdata_location VALUES (44, 'Andhra Pradesh', 'Vizianagaram', 'Parvathipuram', 'Parvathipuram');
INSERT INTO public.admin_masterdata_location VALUES (45, 'Andhra Pradesh', 'Vizianagaram', 'Parvathipuram', 'Seethanagaram');
INSERT INTO public.admin_masterdata_location VALUES (46, 'Andhra Pradesh', 'Vizianagaram', 'Parvathipuram', 'Balijipeta');
INSERT INTO public.admin_masterdata_location VALUES (47, 'Andhra Pradesh', 'Vizianagaram', 'Salur', 'Salur');
INSERT INTO public.admin_masterdata_location VALUES (48, 'Andhra Pradesh', 'Vizianagaram', 'Salur', 'Pachipenta');
INSERT INTO public.admin_masterdata_location VALUES (49, 'Andhra Pradesh', 'Vizianagaram', 'Salur', 'Mentada');
INSERT INTO public.admin_masterdata_location VALUES (50, 'Andhra Pradesh', 'Vizianagaram', 'Salur', 'Makkuva');
INSERT INTO public.admin_masterdata_location VALUES (51, 'Andhra Pradesh', 'Vizianagaram', 'Bobbili', 'Bobbili');
INSERT INTO public.admin_masterdata_location VALUES (52, 'Andhra Pradesh', 'Vizianagaram', 'Bobbili', 'Ramabhadrapuram');
INSERT INTO public.admin_masterdata_location VALUES (53, 'Andhra Pradesh', 'Vizianagaram', 'Bobbili', 'Badangi');
INSERT INTO public.admin_masterdata_location VALUES (54, 'Andhra Pradesh', 'Vizianagaram', 'Bobbili', 'Therlam');
INSERT INTO public.admin_masterdata_location VALUES (55, 'Andhra Pradesh', 'Vizianagaram', 'Cheepurupalli', 'Cheepurupalli');
INSERT INTO public.admin_masterdata_location VALUES (56, 'Andhra Pradesh', 'Vizianagaram', 'Cheepurupalli', 'Merakamudidam');
INSERT INTO public.admin_masterdata_location VALUES (57, 'Andhra Pradesh', 'Vizianagaram', 'Cheepurupalli', 'Garividi');
INSERT INTO public.admin_masterdata_location VALUES (58, 'Andhra Pradesh', 'Vizianagaram', 'Cheepurupalli', 'Gurla');
INSERT INTO public.admin_masterdata_location VALUES (59, 'Andhra Pradesh', 'Vizianagaram', 'Gajapathinagaram', 'Gajapathinagaram');
INSERT INTO public.admin_masterdata_location VALUES (60, 'Andhra Pradesh', 'Vizianagaram', 'Gajapathinagaram', 'Bondapalli');
INSERT INTO public.admin_masterdata_location VALUES (61, 'Andhra Pradesh', 'Vizianagaram', 'Gajapathinagaram', 'Gantyada');
INSERT INTO public.admin_masterdata_location VALUES (62, 'Andhra Pradesh', 'Vizianagaram', 'Gajapathinagaram', 'Dattirajeru');
INSERT INTO public.admin_masterdata_location VALUES (63, 'Andhra Pradesh', 'Vizianagaram', 'Nellimarla', 'Nellimarla');
INSERT INTO public.admin_masterdata_location VALUES (64, 'Andhra Pradesh', 'Vizianagaram', 'Nellimarla', 'Pusapatirega');
INSERT INTO public.admin_masterdata_location VALUES (65, 'Andhra Pradesh', 'Vizianagaram', 'Nellimarla', 'Denkada');
INSERT INTO public.admin_masterdata_location VALUES (66, 'Andhra Pradesh', 'Vizianagaram', 'Nellimarla', 'Bhogapuram');
INSERT INTO public.admin_masterdata_location VALUES (67, 'Andhra Pradesh', 'Vizianagaram', 'Vizianagaram', 'Vizianagaram');
INSERT INTO public.admin_masterdata_location VALUES (68, 'Andhra Pradesh', 'Vizianagaram', 'Srungavarapukota', 'Srungavarapukota');
INSERT INTO public.admin_masterdata_location VALUES (69, 'Andhra Pradesh', 'Vizianagaram', 'Srungavarapukota', 'Lakkavarapukota');
INSERT INTO public.admin_masterdata_location VALUES (70, 'Andhra Pradesh', 'Vizianagaram', 'Srungavarapukota', 'Kothavalasa');
INSERT INTO public.admin_masterdata_location VALUES (71, 'Andhra Pradesh', 'Vizianagaram', 'Srungavarapukota', 'Vepada');
INSERT INTO public.admin_masterdata_location VALUES (72, 'Andhra Pradesh', 'Vizianagaram', 'Srungavarapukota', 'Jami');
INSERT INTO public.admin_masterdata_location VALUES (73, 'Andhra Pradesh', 'Visakhapatnam', 'Bhimili', 'Bheemunipatnam');
INSERT INTO public.admin_masterdata_location VALUES (74, 'Andhra Pradesh', 'Visakhapatnam', 'Bhimili', 'Anandapuram');
INSERT INTO public.admin_masterdata_location VALUES (75, 'Andhra Pradesh', 'Visakhapatnam', 'Bhimili', 'Padmanabham');
INSERT INTO public.admin_masterdata_location VALUES (76, 'Andhra Pradesh', 'Visakhapatnam', 'Bhimili', 'Visakhapatnam Rural');
INSERT INTO public.admin_masterdata_location VALUES (77, 'Andhra Pradesh', 'Visakhapatnam', 'Visakhapatnam East', 'Visakhapatnam Urban (Part)');
INSERT INTO public.admin_masterdata_location VALUES (78, 'Andhra Pradesh', 'Visakhapatnam', 'Visakhapatnam South', 'Visakhapatnam Urban (Part)');
INSERT INTO public.admin_masterdata_location VALUES (79, 'Andhra Pradesh', 'Visakhapatnam', 'Visakhapatnam North', 'Visakhapatnam Urban (Part)');
INSERT INTO public.admin_masterdata_location VALUES (80, 'Andhra Pradesh', 'Visakhapatnam', 'Visakhapatnam West', 'Visakhapatnam Urban (Part)');
INSERT INTO public.admin_masterdata_location VALUES (81, 'Andhra Pradesh', 'Visakhapatnam', 'Gajuwaka', 'Gajuwaka');
INSERT INTO public.admin_masterdata_location VALUES (82, 'Andhra Pradesh', 'Visakhapatnam', 'Gajuwaka', 'Pedagantyada');
INSERT INTO public.admin_masterdata_location VALUES (83, 'Andhra Pradesh', 'Anakapalli', 'Chodavaram', 'Chodavaram');
INSERT INTO public.admin_masterdata_location VALUES (84, 'Andhra Pradesh', 'Anakapalli', 'Chodavaram', 'Butchayyapeta');
INSERT INTO public.admin_masterdata_location VALUES (85, 'Andhra Pradesh', 'Anakapalli', 'Chodavaram', 'Rolugunta');
INSERT INTO public.admin_masterdata_location VALUES (86, 'Andhra Pradesh', 'Anakapalli', 'Madugula', 'Madugula');
INSERT INTO public.admin_masterdata_location VALUES (87, 'Andhra Pradesh', 'Anakapalli', 'Madugula', 'Cheedikada');
INSERT INTO public.admin_masterdata_location VALUES (88, 'Andhra Pradesh', 'Anakapalli', 'Madugula', 'Devarapalle');
INSERT INTO public.admin_masterdata_location VALUES (89, 'Andhra Pradesh', 'Anakapalli', 'Madugula', 'K.Kotapadu');
INSERT INTO public.admin_masterdata_location VALUES (90, 'Andhra Pradesh', 'Anakapalli', 'Anakapalle', 'Anakapalle');
INSERT INTO public.admin_masterdata_location VALUES (91, 'Andhra Pradesh', 'Anakapalli', 'Anakapalle', 'Kasimkota');
INSERT INTO public.admin_masterdata_location VALUES (92, 'Andhra Pradesh', 'Anakapalli', 'Pendurthi', 'Pendurthi');
INSERT INTO public.admin_masterdata_location VALUES (93, 'Andhra Pradesh', 'Anakapalli', 'Pendurthi', 'Paravada');
INSERT INTO public.admin_masterdata_location VALUES (94, 'Andhra Pradesh', 'Anakapalli', 'Pendurthi', 'Sabbavaram');
INSERT INTO public.admin_masterdata_location VALUES (95, 'Andhra Pradesh', 'Anakapalli', 'Elamanchili', 'Elamanchili');
INSERT INTO public.admin_masterdata_location VALUES (897, 'Telangana', 'Medak', 'Patancheru', 'Jinnaram');
INSERT INTO public.admin_masterdata_location VALUES (96, 'Andhra Pradesh', 'Anakapalli', 'Elamanchili', 'Rambilli');
INSERT INTO public.admin_masterdata_location VALUES (97, 'Andhra Pradesh', 'Anakapalli', 'Elamanchili', 'Munagapaka');
INSERT INTO public.admin_masterdata_location VALUES (98, 'Andhra Pradesh', 'Anakapalli', 'Elamanchili', 'Atchutapuram');
INSERT INTO public.admin_masterdata_location VALUES (99, 'Andhra Pradesh', 'Anakapalli', 'Payakaraopet', 'Payakaraopeta');
INSERT INTO public.admin_masterdata_location VALUES (100, 'Andhra Pradesh', 'Anakapalli', 'Payakaraopet', 'Nakkapalle');
INSERT INTO public.admin_masterdata_location VALUES (101, 'Andhra Pradesh', 'Anakapalli', 'Payakaraopet', 'Kotauratla');
INSERT INTO public.admin_masterdata_location VALUES (102, 'Andhra Pradesh', 'Anakapalli', 'Payakaraopet', 'S.Rayavaram');
INSERT INTO public.admin_masterdata_location VALUES (103, 'Andhra Pradesh', 'Anakapalli', 'Narsipatnam', 'Narsipatnam');
INSERT INTO public.admin_masterdata_location VALUES (104, 'Andhra Pradesh', 'Anakapalli', 'Narsipatnam', 'Golugonda');
INSERT INTO public.admin_masterdata_location VALUES (105, 'Andhra Pradesh', 'Anakapalli', 'Narsipatnam', 'Makavarapalem');
INSERT INTO public.admin_masterdata_location VALUES (106, 'Andhra Pradesh', 'Anakapalli', 'Narsipatnam', 'Nathavaram');
INSERT INTO public.admin_masterdata_location VALUES (107, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Araku Valley', 'Araku Valley');
INSERT INTO public.admin_masterdata_location VALUES (108, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Araku Valley', 'Pedabayalu');
INSERT INTO public.admin_masterdata_location VALUES (109, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Araku Valley', 'Dumbriguda');
INSERT INTO public.admin_masterdata_location VALUES (110, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Araku Valley', 'Munchingiputtu');
INSERT INTO public.admin_masterdata_location VALUES (111, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Araku Valley', 'Hukumpeta');
INSERT INTO public.admin_masterdata_location VALUES (112, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Araku Valley', 'Ananthagiri');
INSERT INTO public.admin_masterdata_location VALUES (113, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Paderu', 'Paderu');
INSERT INTO public.admin_masterdata_location VALUES (114, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Paderu', 'G.Madugula');
INSERT INTO public.admin_masterdata_location VALUES (115, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Paderu', 'Chintapalle');
INSERT INTO public.admin_masterdata_location VALUES (116, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Paderu', 'Gudem Kotha Veedhi');
INSERT INTO public.admin_masterdata_location VALUES (117, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Paderu', 'Koyyuru');
INSERT INTO public.admin_masterdata_location VALUES (118, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Rampachodavaram', 'Rampachodavaram');
INSERT INTO public.admin_masterdata_location VALUES (119, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Rampachodavaram', 'Devipatnam');
INSERT INTO public.admin_masterdata_location VALUES (120, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Rampachodavaram', 'Y. Ramavaram');
INSERT INTO public.admin_masterdata_location VALUES (121, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Rampachodavaram', 'Addateegala');
INSERT INTO public.admin_masterdata_location VALUES (122, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Rampachodavaram', 'Gangavaram');
INSERT INTO public.admin_masterdata_location VALUES (123, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Rampachodavaram', 'Maredumilli');
INSERT INTO public.admin_masterdata_location VALUES (124, 'Andhra Pradesh', 'Alluri Sitharama Raju', 'Rampachodavaram', 'Rajavommangi');
INSERT INTO public.admin_masterdata_location VALUES (125, 'Andhra Pradesh', 'Kakinada', 'Tuni', 'Tuni');
INSERT INTO public.admin_masterdata_location VALUES (126, 'Andhra Pradesh', 'Kakinada', 'Tuni', 'Thondangi');
INSERT INTO public.admin_masterdata_location VALUES (127, 'Andhra Pradesh', 'Kakinada', 'Tuni', 'Kotananduru');
INSERT INTO public.admin_masterdata_location VALUES (128, 'Andhra Pradesh', 'Kakinada', 'Prathipadu', 'Prathipadu');
INSERT INTO public.admin_masterdata_location VALUES (129, 'Andhra Pradesh', 'Kakinada', 'Prathipadu', 'Sankhavaram');
INSERT INTO public.admin_masterdata_location VALUES (130, 'Andhra Pradesh', 'Kakinada', 'Prathipadu', 'Yeleswaram');
INSERT INTO public.admin_masterdata_location VALUES (131, 'Andhra Pradesh', 'Kakinada', 'Prathipadu', 'Rowthulapudi');
INSERT INTO public.admin_masterdata_location VALUES (132, 'Andhra Pradesh', 'Kakinada', 'Pithapuram', 'Pithapuram');
INSERT INTO public.admin_masterdata_location VALUES (133, 'Andhra Pradesh', 'Kakinada', 'Pithapuram', 'U.Kothapalli');
INSERT INTO public.admin_masterdata_location VALUES (134, 'Andhra Pradesh', 'Kakinada', 'Pithapuram', 'Gollaprolu');
INSERT INTO public.admin_masterdata_location VALUES (135, 'Andhra Pradesh', 'Kakinada', 'Kakinada Rural', 'Kakinada Rural');
INSERT INTO public.admin_masterdata_location VALUES (136, 'Andhra Pradesh', 'Kakinada', 'Kakinada Rural', 'Karapa');
INSERT INTO public.admin_masterdata_location VALUES (137, 'Andhra Pradesh', 'Kakinada', 'Peddapuram', 'Peddapuram');
INSERT INTO public.admin_masterdata_location VALUES (138, 'Andhra Pradesh', 'Kakinada', 'Peddapuram', 'Samalkota');
INSERT INTO public.admin_masterdata_location VALUES (139, 'Andhra Pradesh', 'Kakinada', 'Kakinada City', 'Kakinada Urban');
INSERT INTO public.admin_masterdata_location VALUES (140, 'Andhra Pradesh', 'Kakinada', 'Jaggampeta', 'Jaggampeta');
INSERT INTO public.admin_masterdata_location VALUES (141, 'Andhra Pradesh', 'Kakinada', 'Jaggampeta', 'Gandepalli');
INSERT INTO public.admin_masterdata_location VALUES (142, 'Andhra Pradesh', 'Kakinada', 'Jaggampeta', 'Kirlampudi');
INSERT INTO public.admin_masterdata_location VALUES (143, 'Andhra Pradesh', 'East Godavari', 'Anaparthy', 'Anaparthy');
INSERT INTO public.admin_masterdata_location VALUES (144, 'Andhra Pradesh', 'East Godavari', 'Anaparthy', 'Biccavolu');
INSERT INTO public.admin_masterdata_location VALUES (145, 'Andhra Pradesh', 'East Godavari', 'Anaparthy', 'Rangampeta');
INSERT INTO public.admin_masterdata_location VALUES (146, 'Andhra Pradesh', 'East Godavari', 'Rajanagaram', 'Rajanagaram');
INSERT INTO public.admin_masterdata_location VALUES (147, 'Andhra Pradesh', 'East Godavari', 'Rajanagaram', 'Seethanagaram');
INSERT INTO public.admin_masterdata_location VALUES (148, 'Andhra Pradesh', 'East Godavari', 'Rajanagaram', 'Korukonda');
INSERT INTO public.admin_masterdata_location VALUES (149, 'Andhra Pradesh', 'East Godavari', 'Rajahmundry City', 'Rajahmundry Urban');
INSERT INTO public.admin_masterdata_location VALUES (150, 'Andhra Pradesh', 'East Godavari', 'Rajahmundry Rural', 'Rajahmundry Rural');
INSERT INTO public.admin_masterdata_location VALUES (151, 'Andhra Pradesh', 'East Godavari', 'Rajahmundry Rural', 'Kadiam');
INSERT INTO public.admin_masterdata_location VALUES (152, 'Andhra Pradesh', 'East Godavari', 'Kovvur', 'Kovvur');
INSERT INTO public.admin_masterdata_location VALUES (153, 'Andhra Pradesh', 'East Godavari', 'Kovvur', 'Chagallu');
INSERT INTO public.admin_masterdata_location VALUES (154, 'Andhra Pradesh', 'East Godavari', 'Kovvur', 'Tallapudi');
INSERT INTO public.admin_masterdata_location VALUES (155, 'Andhra Pradesh', 'East Godavari', 'Nidadavole', 'Nidadavole');
INSERT INTO public.admin_masterdata_location VALUES (156, 'Andhra Pradesh', 'East Godavari', 'Nidadavole', 'Undrajavaram');
INSERT INTO public.admin_masterdata_location VALUES (157, 'Andhra Pradesh', 'East Godavari', 'Nidadavole', 'Peravali');
INSERT INTO public.admin_masterdata_location VALUES (158, 'Andhra Pradesh', 'East Godavari', 'Gopalapuram', 'Gopalapuram');
INSERT INTO public.admin_masterdata_location VALUES (159, 'Andhra Pradesh', 'East Godavari', 'Gopalapuram', 'Devarapalle');
INSERT INTO public.admin_masterdata_location VALUES (160, 'Andhra Pradesh', 'East Godavari', 'Gopalapuram', 'Nallajarla');
INSERT INTO public.admin_masterdata_location VALUES (161, 'Andhra Pradesh', 'East Godavari', 'Gopalapuram', 'Dwarakatirumala');
INSERT INTO public.admin_masterdata_location VALUES (162, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Ramachandrapuram', 'Ramachandrapuram');
INSERT INTO public.admin_masterdata_location VALUES (163, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Ramachandrapuram', 'Kajuluru');
INSERT INTO public.admin_masterdata_location VALUES (164, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Ramachandrapuram', 'Pamarru');
INSERT INTO public.admin_masterdata_location VALUES (165, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Mummidivaram', 'Mummidivaram');
INSERT INTO public.admin_masterdata_location VALUES (166, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Mummidivaram', 'I. Polavaram');
INSERT INTO public.admin_masterdata_location VALUES (167, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Mummidivaram', 'Katrenikona');
INSERT INTO public.admin_masterdata_location VALUES (168, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Mummidivaram', 'Thallarevu');
INSERT INTO public.admin_masterdata_location VALUES (169, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Amalapuram', 'Amalapuram');
INSERT INTO public.admin_masterdata_location VALUES (170, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Amalapuram', 'Uppalaguptam');
INSERT INTO public.admin_masterdata_location VALUES (171, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Amalapuram', 'Allavaram');
INSERT INTO public.admin_masterdata_location VALUES (172, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Razole', 'Razole');
INSERT INTO public.admin_masterdata_location VALUES (173, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Razole', 'Malikipuram');
INSERT INTO public.admin_masterdata_location VALUES (174, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Razole', 'Sakhinetipalli');
INSERT INTO public.admin_masterdata_location VALUES (175, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Razole', 'Mamidikuduru');
INSERT INTO public.admin_masterdata_location VALUES (176, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Gannavaram', 'P.Gannavaram');
INSERT INTO public.admin_masterdata_location VALUES (177, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Gannavaram', 'Ambajipeta');
INSERT INTO public.admin_masterdata_location VALUES (178, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Gannavaram', 'Ainavilli');
INSERT INTO public.admin_masterdata_location VALUES (179, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Gannavaram', 'Mukteswaram');
INSERT INTO public.admin_masterdata_location VALUES (180, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Kothapeta', 'Kothapeta');
INSERT INTO public.admin_masterdata_location VALUES (181, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Kothapeta', 'Ravulapalem');
INSERT INTO public.admin_masterdata_location VALUES (182, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Kothapeta', 'Atreyapuram');
INSERT INTO public.admin_masterdata_location VALUES (183, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Kothapeta', 'Alamuru');
INSERT INTO public.admin_masterdata_location VALUES (184, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Mandapeta', 'Mandapeta');
INSERT INTO public.admin_masterdata_location VALUES (185, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Mandapeta', 'Rayavaram');
INSERT INTO public.admin_masterdata_location VALUES (186, 'Andhra Pradesh', 'Dr. B.R. Ambedkar Konaseema', 'Mandapeta', 'Kapileswarapuram');
INSERT INTO public.admin_masterdata_location VALUES (187, 'Andhra Pradesh', 'West Godavari', 'Achanta', 'Achanta');
INSERT INTO public.admin_masterdata_location VALUES (188, 'Andhra Pradesh', 'West Godavari', 'Achanta', 'Penugonda');
INSERT INTO public.admin_masterdata_location VALUES (189, 'Andhra Pradesh', 'West Godavari', 'Achanta', 'Penumantra');
INSERT INTO public.admin_masterdata_location VALUES (190, 'Andhra Pradesh', 'West Godavari', 'Achanta', 'Poduru');
INSERT INTO public.admin_masterdata_location VALUES (191, 'Andhra Pradesh', 'West Godavari', 'Palakollu', 'Palakollu');
INSERT INTO public.admin_masterdata_location VALUES (192, 'Andhra Pradesh', 'West Godavari', 'Palakollu', 'Yelamanchili');
INSERT INTO public.admin_masterdata_location VALUES (193, 'Andhra Pradesh', 'West Godavari', 'Palakollu', 'Poduru (Part)');
INSERT INTO public.admin_masterdata_location VALUES (194, 'Andhra Pradesh', 'West Godavari', 'Narasapuram', 'Narasapuram');
INSERT INTO public.admin_masterdata_location VALUES (195, 'Andhra Pradesh', 'West Godavari', 'Narasapuram', 'Mogalthur');
INSERT INTO public.admin_masterdata_location VALUES (196, 'Andhra Pradesh', 'West Godavari', 'Bhimavaram', 'Bhimavaram');
INSERT INTO public.admin_masterdata_location VALUES (197, 'Andhra Pradesh', 'West Godavari', 'Bhimavaram', 'Veeravasaram');
INSERT INTO public.admin_masterdata_location VALUES (198, 'Andhra Pradesh', 'West Godavari', 'Undi', 'Undi');
INSERT INTO public.admin_masterdata_location VALUES (199, 'Andhra Pradesh', 'West Godavari', 'Undi', 'Kalla');
INSERT INTO public.admin_masterdata_location VALUES (200, 'Andhra Pradesh', 'West Godavari', 'Undi', 'Palacoderu');
INSERT INTO public.admin_masterdata_location VALUES (201, 'Andhra Pradesh', 'West Godavari', 'Undi', 'Akividu');
INSERT INTO public.admin_masterdata_location VALUES (202, 'Andhra Pradesh', 'West Godavari', 'Tanuku', 'Tanuku');
INSERT INTO public.admin_masterdata_location VALUES (203, 'Andhra Pradesh', 'West Godavari', 'Tanuku', 'Attili');
INSERT INTO public.admin_masterdata_location VALUES (204, 'Andhra Pradesh', 'West Godavari', 'Tanuku', 'Iragavaram');
INSERT INTO public.admin_masterdata_location VALUES (205, 'Andhra Pradesh', 'West Godavari', 'Tadepalligudem', 'Tadepalligudem');
INSERT INTO public.admin_masterdata_location VALUES (206, 'Andhra Pradesh', 'West Godavari', 'Tadepalligudem', 'Pentapadu');
INSERT INTO public.admin_masterdata_location VALUES (207, 'Andhra Pradesh', 'Eluru', 'Unguturu', 'Unguturu');
INSERT INTO public.admin_masterdata_location VALUES (208, 'Andhra Pradesh', 'Eluru', 'Unguturu', 'Bhimadole');
INSERT INTO public.admin_masterdata_location VALUES (209, 'Andhra Pradesh', 'Eluru', 'Unguturu', 'Nidamarru');
INSERT INTO public.admin_masterdata_location VALUES (210, 'Andhra Pradesh', 'Eluru', 'Unguturu', 'Ganapavaram');
INSERT INTO public.admin_masterdata_location VALUES (211, 'Andhra Pradesh', 'Eluru', 'Denduluru', 'Denduluru');
INSERT INTO public.admin_masterdata_location VALUES (212, 'Andhra Pradesh', 'Eluru', 'Denduluru', 'Pedavegi');
INSERT INTO public.admin_masterdata_location VALUES (213, 'Andhra Pradesh', 'Eluru', 'Denduluru', 'Pedapadu');
INSERT INTO public.admin_masterdata_location VALUES (214, 'Andhra Pradesh', 'Eluru', 'Eluru', 'Eluru');
INSERT INTO public.admin_masterdata_location VALUES (215, 'Andhra Pradesh', 'Eluru', 'Polavaram', 'Polavaram');
INSERT INTO public.admin_masterdata_location VALUES (216, 'Andhra Pradesh', 'Eluru', 'Polavaram', 'Buttayagudem');
INSERT INTO public.admin_masterdata_location VALUES (217, 'Andhra Pradesh', 'Eluru', 'Polavaram', 'Jeelugumilli');
INSERT INTO public.admin_masterdata_location VALUES (218, 'Andhra Pradesh', 'Eluru', 'Polavaram', 'T. Narasapuram');
INSERT INTO public.admin_masterdata_location VALUES (219, 'Andhra Pradesh', 'Eluru', 'Polavaram', 'Kukkunoor');
INSERT INTO public.admin_masterdata_location VALUES (220, 'Andhra Pradesh', 'Eluru', 'Polavaram', 'Velerpadu');
INSERT INTO public.admin_masterdata_location VALUES (221, 'Andhra Pradesh', 'Eluru', 'Chintalapudi', 'Chintalapudi');
INSERT INTO public.admin_masterdata_location VALUES (222, 'Andhra Pradesh', 'Eluru', 'Chintalapudi', 'Lingapalem');
INSERT INTO public.admin_masterdata_location VALUES (223, 'Andhra Pradesh', 'Eluru', 'Chintalapudi', 'Kamavarapukota');
INSERT INTO public.admin_masterdata_location VALUES (224, 'Andhra Pradesh', 'Eluru', 'Chintalapudi', 'Jangareddigudem');
INSERT INTO public.admin_masterdata_location VALUES (225, 'Andhra Pradesh', 'Eluru', 'Nuzvid', 'Nuzvid');
INSERT INTO public.admin_masterdata_location VALUES (226, 'Andhra Pradesh', 'Eluru', 'Nuzvid', 'Agiripalli');
INSERT INTO public.admin_masterdata_location VALUES (227, 'Andhra Pradesh', 'Eluru', 'Nuzvid', 'Chatrai');
INSERT INTO public.admin_masterdata_location VALUES (228, 'Andhra Pradesh', 'Eluru', 'Nuzvid', 'Musunuru');
INSERT INTO public.admin_masterdata_location VALUES (229, 'Andhra Pradesh', 'Eluru', 'Kaikalur', 'Kaikalur');
INSERT INTO public.admin_masterdata_location VALUES (230, 'Andhra Pradesh', 'Eluru', 'Kaikalur', 'Mandavalli');
INSERT INTO public.admin_masterdata_location VALUES (231, 'Andhra Pradesh', 'Eluru', 'Kaikalur', 'Kalidindi');
INSERT INTO public.admin_masterdata_location VALUES (232, 'Andhra Pradesh', 'Eluru', 'Kaikalur', 'Mudinepalli');
INSERT INTO public.admin_masterdata_location VALUES (233, 'Andhra Pradesh', 'NTR', 'Tiruvuru', 'Tiruvuru');
INSERT INTO public.admin_masterdata_location VALUES (234, 'Andhra Pradesh', 'NTR', 'Tiruvuru', 'Gampalagudem');
INSERT INTO public.admin_masterdata_location VALUES (235, 'Andhra Pradesh', 'NTR', 'Tiruvuru', 'Vissannapeta');
INSERT INTO public.admin_masterdata_location VALUES (236, 'Andhra Pradesh', 'NTR', 'Tiruvuru', 'A.Konduru');
INSERT INTO public.admin_masterdata_location VALUES (237, 'Andhra Pradesh', 'NTR', 'Vijayawada West', 'Vijayawada Urban (Part)');
INSERT INTO public.admin_masterdata_location VALUES (238, 'Andhra Pradesh', 'NTR', 'Vijayawada Central', 'Vijayawada Urban (Part)');
INSERT INTO public.admin_masterdata_location VALUES (239, 'Andhra Pradesh', 'NTR', 'Vijayawada East', 'Vijayawada Urban (Part)');
INSERT INTO public.admin_masterdata_location VALUES (240, 'Andhra Pradesh', 'NTR', 'Mylavaram', 'Mylavaram');
INSERT INTO public.admin_masterdata_location VALUES (241, 'Andhra Pradesh', 'NTR', 'Mylavaram', 'G.Konduru');
INSERT INTO public.admin_masterdata_location VALUES (242, 'Andhra Pradesh', 'NTR', 'Mylavaram', 'Reddigudem');
INSERT INTO public.admin_masterdata_location VALUES (243, 'Andhra Pradesh', 'NTR', 'Mylavaram', 'Vijayawada Rural');
INSERT INTO public.admin_masterdata_location VALUES (244, 'Andhra Pradesh', 'NTR', 'Mylavaram', 'Ibrahimpatnam');
INSERT INTO public.admin_masterdata_location VALUES (245, 'Andhra Pradesh', 'NTR', 'Nandigama', 'Nandigama');
INSERT INTO public.admin_masterdata_location VALUES (246, 'Andhra Pradesh', 'NTR', 'Nandigama', 'Kanchikacherla');
INSERT INTO public.admin_masterdata_location VALUES (247, 'Andhra Pradesh', 'NTR', 'Nandigama', 'Chandarlapadu');
INSERT INTO public.admin_masterdata_location VALUES (248, 'Andhra Pradesh', 'NTR', 'Nandigama', 'Veerullapadu');
INSERT INTO public.admin_masterdata_location VALUES (249, 'Andhra Pradesh', 'NTR', 'Jaggayyapeta', 'Jaggayyapeta');
INSERT INTO public.admin_masterdata_location VALUES (250, 'Andhra Pradesh', 'NTR', 'Jaggayyapeta', 'Vatsavai');
INSERT INTO public.admin_masterdata_location VALUES (251, 'Andhra Pradesh', 'NTR', 'Jaggayyapeta', 'Penuganchiprolu');
INSERT INTO public.admin_masterdata_location VALUES (252, 'Andhra Pradesh', 'Krishna', 'Gannavaram', 'Gannavaram');
INSERT INTO public.admin_masterdata_location VALUES (253, 'Andhra Pradesh', 'Krishna', 'Gannavaram', 'Unguturu');
INSERT INTO public.admin_masterdata_location VALUES (254, 'Andhra Pradesh', 'Krishna', 'Gannavaram', 'Bapulapadu');
INSERT INTO public.admin_masterdata_location VALUES (255, 'Andhra Pradesh', 'Krishna', 'Gannavaram', 'Vijayawada Rural (Part)');
INSERT INTO public.admin_masterdata_location VALUES (256, 'Andhra Pradesh', 'Krishna', 'Gudivada', 'Gudivada');
INSERT INTO public.admin_masterdata_location VALUES (257, 'Andhra Pradesh', 'Krishna', 'Gudivada', 'Gudlavalleru');
INSERT INTO public.admin_masterdata_location VALUES (258, 'Andhra Pradesh', 'Krishna', 'Gudivada', 'Nandivada');
INSERT INTO public.admin_masterdata_location VALUES (259, 'Andhra Pradesh', 'Krishna', 'Pedana', 'Pedana');
INSERT INTO public.admin_masterdata_location VALUES (260, 'Andhra Pradesh', 'Krishna', 'Pedana', 'Guduru');
INSERT INTO public.admin_masterdata_location VALUES (261, 'Andhra Pradesh', 'Krishna', 'Pedana', 'Bantumilli');
INSERT INTO public.admin_masterdata_location VALUES (262, 'Andhra Pradesh', 'Krishna', 'Pedana', 'Kruthivennu');
INSERT INTO public.admin_masterdata_location VALUES (263, 'Andhra Pradesh', 'Krishna', 'Machilipatnam', 'Machilipatnam');
INSERT INTO public.admin_masterdata_location VALUES (264, 'Andhra Pradesh', 'Krishna', 'Avanigadda', 'Avanigadda');
INSERT INTO public.admin_masterdata_location VALUES (265, 'Andhra Pradesh', 'Krishna', 'Avanigadda', 'Nagayalanka');
INSERT INTO public.admin_masterdata_location VALUES (266, 'Andhra Pradesh', 'Krishna', 'Avanigadda', 'Koduru');
INSERT INTO public.admin_masterdata_location VALUES (267, 'Andhra Pradesh', 'Krishna', 'Avanigadda', 'Challapalli');
INSERT INTO public.admin_masterdata_location VALUES (268, 'Andhra Pradesh', 'Krishna', 'Avanigadda', 'Mopidevi');
INSERT INTO public.admin_masterdata_location VALUES (269, 'Andhra Pradesh', 'Krishna', 'Avanigadda', 'Ghantasala');
INSERT INTO public.admin_masterdata_location VALUES (270, 'Andhra Pradesh', 'Krishna', 'Pamarru', 'Pamarru');
INSERT INTO public.admin_masterdata_location VALUES (271, 'Andhra Pradesh', 'Krishna', 'Pamarru', 'Thotlavalluru');
INSERT INTO public.admin_masterdata_location VALUES (272, 'Andhra Pradesh', 'Krishna', 'Pamarru', 'Pamidimukkala');
INSERT INTO public.admin_masterdata_location VALUES (273, 'Andhra Pradesh', 'Krishna', 'Pamarru', 'Movva');
INSERT INTO public.admin_masterdata_location VALUES (274, 'Andhra Pradesh', 'Krishna', 'Pamarru', 'Pedaparupudi');
INSERT INTO public.admin_masterdata_location VALUES (275, 'Andhra Pradesh', 'Krishna', 'Penamaluru', 'Penamaluru');
INSERT INTO public.admin_masterdata_location VALUES (276, 'Andhra Pradesh', 'Krishna', 'Penamaluru', 'Kankipadu');
INSERT INTO public.admin_masterdata_location VALUES (277, 'Andhra Pradesh', 'Krishna', 'Penamaluru', 'Vuyyuru');
INSERT INTO public.admin_masterdata_location VALUES (278, 'Andhra Pradesh', 'Guntur', 'Tadikonda', 'Tadikonda');
INSERT INTO public.admin_masterdata_location VALUES (279, 'Andhra Pradesh', 'Guntur', 'Tadikonda', 'Thullur');
INSERT INTO public.admin_masterdata_location VALUES (280, 'Andhra Pradesh', 'Guntur', 'Tadikonda', 'Phirangipuram');
INSERT INTO public.admin_masterdata_location VALUES (281, 'Andhra Pradesh', 'Guntur', 'Tadikonda', 'Medikonduru');
INSERT INTO public.admin_masterdata_location VALUES (282, 'Andhra Pradesh', 'Guntur', 'Mangalagiri', 'Mangalagiri');
INSERT INTO public.admin_masterdata_location VALUES (283, 'Andhra Pradesh', 'Guntur', 'Mangalagiri', 'Tadepalle');
INSERT INTO public.admin_masterdata_location VALUES (284, 'Andhra Pradesh', 'Guntur', 'Mangalagiri', 'Duggirala');
INSERT INTO public.admin_masterdata_location VALUES (285, 'Andhra Pradesh', 'Guntur', 'Ponnuru', 'Ponnuru');
INSERT INTO public.admin_masterdata_location VALUES (286, 'Andhra Pradesh', 'Guntur', 'Ponnuru', 'Chebrolu');
INSERT INTO public.admin_masterdata_location VALUES (287, 'Andhra Pradesh', 'Guntur', 'Ponnuru', 'Kakumanu');
INSERT INTO public.admin_masterdata_location VALUES (288, 'Andhra Pradesh', 'Guntur', 'Tenali', 'Tenali');
INSERT INTO public.admin_masterdata_location VALUES (289, 'Andhra Pradesh', 'Guntur', 'Tenali', 'Kollipara');
INSERT INTO public.admin_masterdata_location VALUES (290, 'Andhra Pradesh', 'Guntur', 'Prathipadu', 'Prathipadu');
INSERT INTO public.admin_masterdata_location VALUES (291, 'Andhra Pradesh', 'Guntur', 'Prathipadu', 'Vatticherukuru');
INSERT INTO public.admin_masterdata_location VALUES (292, 'Andhra Pradesh', 'Guntur', 'Prathipadu', 'Guvaragupalem');
INSERT INTO public.admin_masterdata_location VALUES (293, 'Andhra Pradesh', 'Guntur', 'Prathipadu', 'Pedanandipadu');
INSERT INTO public.admin_masterdata_location VALUES (294, 'Andhra Pradesh', 'Guntur', 'Prathipadu', 'Kakumanu');
INSERT INTO public.admin_masterdata_location VALUES (295, 'Andhra Pradesh', 'Guntur', 'Guntur West', 'Guntur Urban (Part)');
INSERT INTO public.admin_masterdata_location VALUES (296, 'Andhra Pradesh', 'Guntur', 'Guntur East', 'Guntur Urban (Part)');
INSERT INTO public.admin_masterdata_location VALUES (297, 'Andhra Pradesh', 'Bapatla', 'Vemuru', 'Vemuru');
INSERT INTO public.admin_masterdata_location VALUES (298, 'Andhra Pradesh', 'Bapatla', 'Vemuru', 'Kolluru');
INSERT INTO public.admin_masterdata_location VALUES (299, 'Andhra Pradesh', 'Bapatla', 'Vemuru', 'Tsunduru');
INSERT INTO public.admin_masterdata_location VALUES (300, 'Andhra Pradesh', 'Bapatla', 'Vemuru', 'Bhattiprolu');
INSERT INTO public.admin_masterdata_location VALUES (301, 'Andhra Pradesh', 'Bapatla', 'Vemuru', 'Amruthalur');
INSERT INTO public.admin_masterdata_location VALUES (302, 'Andhra Pradesh', 'Bapatla', 'Repalle', 'Repalle');
INSERT INTO public.admin_masterdata_location VALUES (303, 'Andhra Pradesh', 'Bapatla', 'Repalle', 'Nizampatnam');
INSERT INTO public.admin_masterdata_location VALUES (304, 'Andhra Pradesh', 'Bapatla', 'Repalle', 'Nagaram');
INSERT INTO public.admin_masterdata_location VALUES (305, 'Andhra Pradesh', 'Bapatla', 'Repalle', 'Cherukupalle');
INSERT INTO public.admin_masterdata_location VALUES (306, 'Andhra Pradesh', 'Bapatla', 'Bapatla', 'Bapatla');
INSERT INTO public.admin_masterdata_location VALUES (307, 'Andhra Pradesh', 'Bapatla', 'Bapatla', 'Pittalavanipalem');
INSERT INTO public.admin_masterdata_location VALUES (308, 'Andhra Pradesh', 'Bapatla', 'Bapatla', 'Karlapalem');
INSERT INTO public.admin_masterdata_location VALUES (309, 'Andhra Pradesh', 'Bapatla', 'Parchur', 'Parchur');
INSERT INTO public.admin_masterdata_location VALUES (310, 'Andhra Pradesh', 'Bapatla', 'Parchur', 'Karamchedu');
INSERT INTO public.admin_masterdata_location VALUES (311, 'Andhra Pradesh', 'Bapatla', 'Parchur', 'Inkollu');
INSERT INTO public.admin_masterdata_location VALUES (312, 'Andhra Pradesh', 'Bapatla', 'Parchur', 'Chinaganjam');
INSERT INTO public.admin_masterdata_location VALUES (313, 'Andhra Pradesh', 'Bapatla', 'Parchur', 'Martur');
INSERT INTO public.admin_masterdata_location VALUES (314, 'Andhra Pradesh', 'Bapatla', 'Parchur', 'Yeddanapudi');
INSERT INTO public.admin_masterdata_location VALUES (315, 'Andhra Pradesh', 'Bapatla', 'Addanki', 'Addanki');
INSERT INTO public.admin_masterdata_location VALUES (316, 'Andhra Pradesh', 'Bapatla', 'Addanki', 'J.Panguluru');
INSERT INTO public.admin_masterdata_location VALUES (317, 'Andhra Pradesh', 'Bapatla', 'Addanki', 'Santhamaguluru');
INSERT INTO public.admin_masterdata_location VALUES (318, 'Andhra Pradesh', 'Bapatla', 'Addanki', 'Ballikurava');
INSERT INTO public.admin_masterdata_location VALUES (319, 'Andhra Pradesh', 'Bapatla', 'Addanki', 'Korisapadu');
INSERT INTO public.admin_masterdata_location VALUES (320, 'Andhra Pradesh', 'Bapatla', 'Chirala', 'Chirala');
INSERT INTO public.admin_masterdata_location VALUES (321, 'Andhra Pradesh', 'Bapatla', 'Chirala', 'Vetapalem');
INSERT INTO public.admin_masterdata_location VALUES (322, 'Andhra Pradesh', 'Palnadu', 'Pedakurapadu', 'Pedakurapadu');
INSERT INTO public.admin_masterdata_location VALUES (323, 'Andhra Pradesh', 'Palnadu', 'Pedakurapadu', 'Bellamkonda');
INSERT INTO public.admin_masterdata_location VALUES (324, 'Andhra Pradesh', 'Palnadu', 'Pedakurapadu', 'Atchampet');
INSERT INTO public.admin_masterdata_location VALUES (325, 'Andhra Pradesh', 'Palnadu', 'Pedakurapadu', 'Krosuru');
INSERT INTO public.admin_masterdata_location VALUES (326, 'Andhra Pradesh', 'Palnadu', 'Pedakurapadu', 'Amaravathi');
INSERT INTO public.admin_masterdata_location VALUES (327, 'Andhra Pradesh', 'Palnadu', 'Chilakaluripet', 'Chilakaluripet');
INSERT INTO public.admin_masterdata_location VALUES (328, 'Andhra Pradesh', 'Palnadu', 'Chilakaluripet', 'Nadendla');
INSERT INTO public.admin_masterdata_location VALUES (329, 'Andhra Pradesh', 'Palnadu', 'Chilakaluripet', 'Edlapadu');
INSERT INTO public.admin_masterdata_location VALUES (330, 'Andhra Pradesh', 'Palnadu', 'Narasaraopet', 'Narasaraopet');
INSERT INTO public.admin_masterdata_location VALUES (331, 'Andhra Pradesh', 'Palnadu', 'Narasaraopet', 'Rompicherla');
INSERT INTO public.admin_masterdata_location VALUES (332, 'Andhra Pradesh', 'Palnadu', 'Sattenapalle', 'Sattenapalle');
INSERT INTO public.admin_masterdata_location VALUES (333, 'Andhra Pradesh', 'Palnadu', 'Sattenapalle', 'Rajupalem');
INSERT INTO public.admin_masterdata_location VALUES (334, 'Andhra Pradesh', 'Palnadu', 'Sattenapalle', 'Nekarikallu');
INSERT INTO public.admin_masterdata_location VALUES (335, 'Andhra Pradesh', 'Palnadu', 'Sattenapalle', 'Muppalla');
INSERT INTO public.admin_masterdata_location VALUES (336, 'Andhra Pradesh', 'Palnadu', 'Vinukonda', 'Vinukonda');
INSERT INTO public.admin_masterdata_location VALUES (337, 'Andhra Pradesh', 'Palnadu', 'Vinukonda', 'Nuzendla');
INSERT INTO public.admin_masterdata_location VALUES (338, 'Andhra Pradesh', 'Palnadu', 'Vinukonda', 'Savalyapuram');
INSERT INTO public.admin_masterdata_location VALUES (339, 'Andhra Pradesh', 'Palnadu', 'Vinukonda', 'Ipur');
INSERT INTO public.admin_masterdata_location VALUES (340, 'Andhra Pradesh', 'Palnadu', 'Vinukonda', 'Bollapalle');
INSERT INTO public.admin_masterdata_location VALUES (341, 'Andhra Pradesh', 'Palnadu', 'Gurajala', 'Gurajala');
INSERT INTO public.admin_masterdata_location VALUES (342, 'Andhra Pradesh', 'Palnadu', 'Gurajala', 'Dachepalle');
INSERT INTO public.admin_masterdata_location VALUES (343, 'Andhra Pradesh', 'Palnadu', 'Gurajala', 'Piduguralla');
INSERT INTO public.admin_masterdata_location VALUES (344, 'Andhra Pradesh', 'Palnadu', 'Gurajala', 'Machavaram');
INSERT INTO public.admin_masterdata_location VALUES (345, 'Andhra Pradesh', 'Palnadu', 'Macherla', 'Macherla');
INSERT INTO public.admin_masterdata_location VALUES (346, 'Andhra Pradesh', 'Palnadu', 'Macherla', 'Veldurthi');
INSERT INTO public.admin_masterdata_location VALUES (347, 'Andhra Pradesh', 'Palnadu', 'Macherla', 'Durgi');
INSERT INTO public.admin_masterdata_location VALUES (348, 'Andhra Pradesh', 'Palnadu', 'Macherla', 'Rentachintala');
INSERT INTO public.admin_masterdata_location VALUES (349, 'Andhra Pradesh', 'Palnadu', 'Macherla', 'Karempudi');
INSERT INTO public.admin_masterdata_location VALUES (350, 'Andhra Pradesh', 'Prakasam', 'Yerragondapalem', 'Yerragondapalem');
INSERT INTO public.admin_masterdata_location VALUES (351, 'Andhra Pradesh', 'Prakasam', 'Yerragondapalem', 'Pullalacheruvu');
INSERT INTO public.admin_masterdata_location VALUES (352, 'Andhra Pradesh', 'Prakasam', 'Yerragondapalem', 'Tripurantakam');
INSERT INTO public.admin_masterdata_location VALUES (353, 'Andhra Pradesh', 'Prakasam', 'Yerragondapalem', 'Dornala');
INSERT INTO public.admin_masterdata_location VALUES (354, 'Andhra Pradesh', 'Prakasam', 'Yerragondapalem', 'Peda Araveedu');
INSERT INTO public.admin_masterdata_location VALUES (355, 'Andhra Pradesh', 'Prakasam', 'Darsi', 'Darsi');
INSERT INTO public.admin_masterdata_location VALUES (356, 'Andhra Pradesh', 'Prakasam', 'Darsi', 'Donakonda');
INSERT INTO public.admin_masterdata_location VALUES (357, 'Andhra Pradesh', 'Prakasam', 'Darsi', 'Kurichedu');
INSERT INTO public.admin_masterdata_location VALUES (358, 'Andhra Pradesh', 'Prakasam', 'Darsi', 'Mundlamuru');
INSERT INTO public.admin_masterdata_location VALUES (359, 'Andhra Pradesh', 'Prakasam', 'Darsi', 'Thallur');
INSERT INTO public.admin_masterdata_location VALUES (360, 'Andhra Pradesh', 'Prakasam', 'Santhanuthalapadu', 'Santhanuthalapadu');
INSERT INTO public.admin_masterdata_location VALUES (361, 'Andhra Pradesh', 'Prakasam', 'Santhanuthalapadu', 'Maddipadu');
INSERT INTO public.admin_masterdata_location VALUES (362, 'Andhra Pradesh', 'Prakasam', 'Santhanuthalapadu', 'Chimakurthy');
INSERT INTO public.admin_masterdata_location VALUES (363, 'Andhra Pradesh', 'Prakasam', 'Santhanuthalapadu', 'Naguluppalapadu');
INSERT INTO public.admin_masterdata_location VALUES (364, 'Andhra Pradesh', 'Prakasam', 'Ongole', 'Ongole');
INSERT INTO public.admin_masterdata_location VALUES (365, 'Andhra Pradesh', 'Prakasam', 'Ongole', 'Kothapatnam');
INSERT INTO public.admin_masterdata_location VALUES (366, 'Andhra Pradesh', 'Prakasam', 'Kondapi', 'Kondapi');
INSERT INTO public.admin_masterdata_location VALUES (367, 'Andhra Pradesh', 'Prakasam', 'Kondapi', 'Singarayakonda');
INSERT INTO public.admin_masterdata_location VALUES (368, 'Andhra Pradesh', 'Prakasam', 'Kondapi', 'Tangutur');
INSERT INTO public.admin_masterdata_location VALUES (369, 'Andhra Pradesh', 'Prakasam', 'Kondapi', 'Jarugumalli');
INSERT INTO public.admin_masterdata_location VALUES (370, 'Andhra Pradesh', 'Prakasam', 'Kondapi', 'Ponnaluru');
INSERT INTO public.admin_masterdata_location VALUES (371, 'Andhra Pradesh', 'Prakasam', 'Kondapi', 'Marripudi');
INSERT INTO public.admin_masterdata_location VALUES (372, 'Andhra Pradesh', 'Prakasam', 'Markapuram', 'Markapuram');
INSERT INTO public.admin_masterdata_location VALUES (373, 'Andhra Pradesh', 'Prakasam', 'Markapuram', 'Konakanamitla');
INSERT INTO public.admin_masterdata_location VALUES (374, 'Andhra Pradesh', 'Prakasam', 'Markapuram', 'Tarlupadu');
INSERT INTO public.admin_masterdata_location VALUES (375, 'Andhra Pradesh', 'Prakasam', 'Giddalur', 'Giddalur');
INSERT INTO public.admin_masterdata_location VALUES (376, 'Andhra Pradesh', 'Prakasam', 'Giddalur', 'Bestavaripeta');
INSERT INTO public.admin_masterdata_location VALUES (377, 'Andhra Pradesh', 'Prakasam', 'Giddalur', 'Racherla');
INSERT INTO public.admin_masterdata_location VALUES (378, 'Andhra Pradesh', 'Prakasam', 'Giddalur', 'Komarolu');
INSERT INTO public.admin_masterdata_location VALUES (379, 'Andhra Pradesh', 'Prakasam', 'Giddalur', 'Cumbum');
INSERT INTO public.admin_masterdata_location VALUES (380, 'Andhra Pradesh', 'Prakasam', 'Giddalur', 'Ardhaveedu');
INSERT INTO public.admin_masterdata_location VALUES (381, 'Andhra Pradesh', 'Prakasam', 'Kanigiri', 'Kanigiri');
INSERT INTO public.admin_masterdata_location VALUES (382, 'Andhra Pradesh', 'Prakasam', 'Kanigiri', 'Hanumanthunipadu');
INSERT INTO public.admin_masterdata_location VALUES (383, 'Andhra Pradesh', 'Prakasam', 'Kanigiri', 'Veligandla');
INSERT INTO public.admin_masterdata_location VALUES (384, 'Andhra Pradesh', 'Prakasam', 'Kanigiri', 'Pedacherlopalle');
INSERT INTO public.admin_masterdata_location VALUES (385, 'Andhra Pradesh', 'Prakasam', 'Kanigiri', 'Chandrasekharapuram');
INSERT INTO public.admin_masterdata_location VALUES (386, 'Andhra Pradesh', 'Prakasam', 'Kanigiri', 'Pamur');
INSERT INTO public.admin_masterdata_location VALUES (387, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Kandukur', 'Kandukur');
INSERT INTO public.admin_masterdata_location VALUES (388, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Kandukur', 'Lingasamudram');
INSERT INTO public.admin_masterdata_location VALUES (389, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Kandukur', 'Gudluru');
INSERT INTO public.admin_masterdata_location VALUES (390, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Kandukur', 'Ulavapadu');
INSERT INTO public.admin_masterdata_location VALUES (391, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Kandukur', 'Voletivaripalem');
INSERT INTO public.admin_masterdata_location VALUES (392, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Kavali', 'Kavali');
INSERT INTO public.admin_masterdata_location VALUES (393, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Kavali', 'Bogole');
INSERT INTO public.admin_masterdata_location VALUES (394, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Kavali', 'Allur');
INSERT INTO public.admin_masterdata_location VALUES (395, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Kavali', 'Dagadarthi');
INSERT INTO public.admin_masterdata_location VALUES (396, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Atmakur', 'Atmakur');
INSERT INTO public.admin_masterdata_location VALUES (397, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Atmakur', 'Chejerla');
INSERT INTO public.admin_masterdata_location VALUES (398, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Atmakur', 'Ananthasagaram');
INSERT INTO public.admin_masterdata_location VALUES (399, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Atmakur', 'Anamasamudramu');
INSERT INTO public.admin_masterdata_location VALUES (400, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Atmakur', 'Sangam');
INSERT INTO public.admin_masterdata_location VALUES (401, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Atmakur', 'Marripadu');
INSERT INTO public.admin_masterdata_location VALUES (402, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Kovuru', 'Kovuru');
INSERT INTO public.admin_masterdata_location VALUES (403, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Kovuru', 'Buchireddypalem');
INSERT INTO public.admin_masterdata_location VALUES (404, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Kovuru', 'Indukurpet');
INSERT INTO public.admin_masterdata_location VALUES (405, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Kovuru', 'Kodavalur');
INSERT INTO public.admin_masterdata_location VALUES (406, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Kovuru', 'Vidavalur');
INSERT INTO public.admin_masterdata_location VALUES (407, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Nellore City', 'Nellore Urban (Part)');
INSERT INTO public.admin_masterdata_location VALUES (408, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Nellore Rural', 'Nellore Rural');
INSERT INTO public.admin_masterdata_location VALUES (409, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Nellore Rural', 'Nellore Urban (Part)');
INSERT INTO public.admin_masterdata_location VALUES (410, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Sarvepalli', 'Podalakur');
INSERT INTO public.admin_masterdata_location VALUES (411, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Sarvepalli', 'Thotapalligudur');
INSERT INTO public.admin_masterdata_location VALUES (412, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Sarvepalli', 'Muthukur');
INSERT INTO public.admin_masterdata_location VALUES (413, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Sarvepalli', 'Venkatachalam');
INSERT INTO public.admin_masterdata_location VALUES (414, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Sarvepalli', 'Manubolu');
INSERT INTO public.admin_masterdata_location VALUES (415, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Udayagiri', 'Udayagiri');
INSERT INTO public.admin_masterdata_location VALUES (416, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Udayagiri', 'Varikuntapadu');
INSERT INTO public.admin_masterdata_location VALUES (417, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Udayagiri', 'Vinjamur');
INSERT INTO public.admin_masterdata_location VALUES (418, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Udayagiri', 'Duttalur');
INSERT INTO public.admin_masterdata_location VALUES (419, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Udayagiri', 'Sitarampuram');
INSERT INTO public.admin_masterdata_location VALUES (420, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Udayagiri', 'Kaligiri');
INSERT INTO public.admin_masterdata_location VALUES (421, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Udayagiri', 'Kondapuram');
INSERT INTO public.admin_masterdata_location VALUES (422, 'Andhra Pradesh', 'Sri Potti Sriramulu Nellore', 'Udayagiri', 'Jaladanki');
INSERT INTO public.admin_masterdata_location VALUES (423, 'Andhra Pradesh', 'Tirupati', 'Gudur', 'Gudur');
INSERT INTO public.admin_masterdata_location VALUES (424, 'Andhra Pradesh', 'Tirupati', 'Gudur', 'Chillakur');
INSERT INTO public.admin_masterdata_location VALUES (425, 'Andhra Pradesh', 'Tirupati', 'Gudur', 'Kota');
INSERT INTO public.admin_masterdata_location VALUES (426, 'Andhra Pradesh', 'Tirupati', 'Gudur', 'Vakadu');
INSERT INTO public.admin_masterdata_location VALUES (427, 'Andhra Pradesh', 'Tirupati', 'Gudur', 'Chittamur');
INSERT INTO public.admin_masterdata_location VALUES (428, 'Andhra Pradesh', 'Tirupati', 'Sullurpeta', 'Sullurpeta');
INSERT INTO public.admin_masterdata_location VALUES (429, 'Andhra Pradesh', 'Tirupati', 'Sullurpeta', 'Doravarisatram');
INSERT INTO public.admin_masterdata_location VALUES (430, 'Andhra Pradesh', 'Tirupati', 'Sullurpeta', 'Tada');
INSERT INTO public.admin_masterdata_location VALUES (431, 'Andhra Pradesh', 'Tirupati', 'Sullurpeta', 'Naidupeta');
INSERT INTO public.admin_masterdata_location VALUES (432, 'Andhra Pradesh', 'Tirupati', 'Sullurpeta', 'Pellakur');
INSERT INTO public.admin_masterdata_location VALUES (433, 'Andhra Pradesh', 'Tirupati', 'Sullurpeta', 'Ozili');
INSERT INTO public.admin_masterdata_location VALUES (434, 'Andhra Pradesh', 'Tirupati', 'Venkatagiri', 'Venkatagiri');
INSERT INTO public.admin_masterdata_location VALUES (435, 'Andhra Pradesh', 'Tirupati', 'Venkatagiri', 'Balayapalle');
INSERT INTO public.admin_masterdata_location VALUES (436, 'Andhra Pradesh', 'Tirupati', 'Venkatagiri', 'Dakkili');
INSERT INTO public.admin_masterdata_location VALUES (437, 'Andhra Pradesh', 'Tirupati', 'Venkatagiri', 'Rapur');
INSERT INTO public.admin_masterdata_location VALUES (438, 'Andhra Pradesh', 'Tirupati', 'Venkatagiri', 'Sydapuram');
INSERT INTO public.admin_masterdata_location VALUES (439, 'Andhra Pradesh', 'Tirupati', 'Venkatagiri', 'Kaluvoya');
INSERT INTO public.admin_masterdata_location VALUES (440, 'Andhra Pradesh', 'Tirupati', 'Chandragiri', 'Chandragiri');
INSERT INTO public.admin_masterdata_location VALUES (441, 'Andhra Pradesh', 'Tirupati', 'Chandragiri', 'Pakala');
INSERT INTO public.admin_masterdata_location VALUES (442, 'Andhra Pradesh', 'Tirupati', 'Chandragiri', 'Ramachandrapuram');
INSERT INTO public.admin_masterdata_location VALUES (443, 'Andhra Pradesh', 'Tirupati', 'Chandragiri', 'Chinnagottigallu');
INSERT INTO public.admin_masterdata_location VALUES (444, 'Andhra Pradesh', 'Tirupati', 'Chandragiri', 'Yerravaripalem');
INSERT INTO public.admin_masterdata_location VALUES (445, 'Andhra Pradesh', 'Tirupati', 'Chandragiri', 'Tirupati Rural (Part)');
INSERT INTO public.admin_masterdata_location VALUES (446, 'Andhra Pradesh', 'Tirupati', 'Tirupati', 'Tirupati Urban');
INSERT INTO public.admin_masterdata_location VALUES (447, 'Andhra Pradesh', 'Tirupati', 'Srikalahasti', 'Srikalahasti');
INSERT INTO public.admin_masterdata_location VALUES (448, 'Andhra Pradesh', 'Tirupati', 'Srikalahasti', 'Thottambedu');
INSERT INTO public.admin_masterdata_location VALUES (449, 'Andhra Pradesh', 'Tirupati', 'Srikalahasti', 'Renigunta');
INSERT INTO public.admin_masterdata_location VALUES (450, 'Andhra Pradesh', 'Tirupati', 'Srikalahasti', 'Yerpedu');
INSERT INTO public.admin_masterdata_location VALUES (451, 'Andhra Pradesh', 'Tirupati', 'Sathyavedu', 'Sathyavedu');
INSERT INTO public.admin_masterdata_location VALUES (452, 'Andhra Pradesh', 'Tirupati', 'Sathyavedu', 'Varadaiahpalem');
INSERT INTO public.admin_masterdata_location VALUES (453, 'Andhra Pradesh', 'Tirupati', 'Sathyavedu', 'K.V.B.Puram');
INSERT INTO public.admin_masterdata_location VALUES (454, 'Andhra Pradesh', 'Tirupati', 'Sathyavedu', 'Pichatur');
INSERT INTO public.admin_masterdata_location VALUES (455, 'Andhra Pradesh', 'Tirupati', 'Sathyavedu', 'Nagalapuram');
INSERT INTO public.admin_masterdata_location VALUES (456, 'Andhra Pradesh', 'Tirupati', 'Sathyavedu', 'Nindra');
INSERT INTO public.admin_masterdata_location VALUES (457, 'Andhra Pradesh', 'Tirupati', 'Sathyavedu', 'Vijayapuram');
INSERT INTO public.admin_masterdata_location VALUES (458, 'Andhra Pradesh', 'YSR Kadapa', 'Badvel', 'Badvel');
INSERT INTO public.admin_masterdata_location VALUES (459, 'Andhra Pradesh', 'YSR Kadapa', 'Badvel', 'Kalasapadu');
INSERT INTO public.admin_masterdata_location VALUES (460, 'Andhra Pradesh', 'YSR Kadapa', 'Badvel', 'B.Kodur');
INSERT INTO public.admin_masterdata_location VALUES (461, 'Andhra Pradesh', 'YSR Kadapa', 'Badvel', 'Sri Avadhutha Kasinayana');
INSERT INTO public.admin_masterdata_location VALUES (462, 'Andhra Pradesh', 'YSR Kadapa', 'Badvel', 'Porumamilla');
INSERT INTO public.admin_masterdata_location VALUES (463, 'Andhra Pradesh', 'YSR Kadapa', 'Badvel', 'Gopavaram');
INSERT INTO public.admin_masterdata_location VALUES (464, 'Andhra Pradesh', 'YSR Kadapa', 'Badvel', 'Atlur');
INSERT INTO public.admin_masterdata_location VALUES (465, 'Andhra Pradesh', 'YSR Kadapa', 'Kadapa', 'Kadapa');
INSERT INTO public.admin_masterdata_location VALUES (466, 'Andhra Pradesh', 'YSR Kadapa', 'Pulivendla', 'Pulivendla');
INSERT INTO public.admin_masterdata_location VALUES (467, 'Andhra Pradesh', 'YSR Kadapa', 'Pulivendla', 'Simhadripuram');
INSERT INTO public.admin_masterdata_location VALUES (468, 'Andhra Pradesh', 'YSR Kadapa', 'Pulivendla', 'Lingala');
INSERT INTO public.admin_masterdata_location VALUES (469, 'Andhra Pradesh', 'YSR Kadapa', 'Pulivendla', 'Thondur');
INSERT INTO public.admin_masterdata_location VALUES (470, 'Andhra Pradesh', 'YSR Kadapa', 'Pulivendla', 'Vempalli');
INSERT INTO public.admin_masterdata_location VALUES (471, 'Andhra Pradesh', 'YSR Kadapa', 'Pulivendla', 'Chakrayapeta');
INSERT INTO public.admin_masterdata_location VALUES (472, 'Andhra Pradesh', 'YSR Kadapa', 'Pulivendla', 'Vemula');
INSERT INTO public.admin_masterdata_location VALUES (473, 'Andhra Pradesh', 'YSR Kadapa', 'Kamalapuram', 'Kamalapuram');
INSERT INTO public.admin_masterdata_location VALUES (474, 'Andhra Pradesh', 'YSR Kadapa', 'Kamalapuram', 'Vallur');
INSERT INTO public.admin_masterdata_location VALUES (475, 'Andhra Pradesh', 'YSR Kadapa', 'Kamalapuram', 'Chennur');
INSERT INTO public.admin_masterdata_location VALUES (476, 'Andhra Pradesh', 'YSR Kadapa', 'Kamalapuram', 'Chintakommadinne');
INSERT INTO public.admin_masterdata_location VALUES (477, 'Andhra Pradesh', 'YSR Kadapa', 'Kamalapuram', 'Pendlimarri');
INSERT INTO public.admin_masterdata_location VALUES (478, 'Andhra Pradesh', 'YSR Kadapa', 'Kamalapuram', 'Veerapunayunipalle');
INSERT INTO public.admin_masterdata_location VALUES (479, 'Andhra Pradesh', 'YSR Kadapa', 'Jammalamadugu', 'Jammalamadugu');
INSERT INTO public.admin_masterdata_location VALUES (480, 'Andhra Pradesh', 'YSR Kadapa', 'Jammalamadugu', 'Mylavaram');
INSERT INTO public.admin_masterdata_location VALUES (481, 'Andhra Pradesh', 'YSR Kadapa', 'Jammalamadugu', 'Muddanur');
INSERT INTO public.admin_masterdata_location VALUES (482, 'Andhra Pradesh', 'YSR Kadapa', 'Jammalamadugu', 'Kondapuram');
INSERT INTO public.admin_masterdata_location VALUES (483, 'Andhra Pradesh', 'YSR Kadapa', 'Jammalamadugu', 'Peddamudium');
INSERT INTO public.admin_masterdata_location VALUES (484, 'Andhra Pradesh', 'YSR Kadapa', 'Jammalamadugu', 'Yerraguntla');
INSERT INTO public.admin_masterdata_location VALUES (485, 'Andhra Pradesh', 'YSR Kadapa', 'Proddatur', 'Proddatur');
INSERT INTO public.admin_masterdata_location VALUES (486, 'Andhra Pradesh', 'YSR Kadapa', 'Proddatur', 'Raju Palem');
INSERT INTO public.admin_masterdata_location VALUES (487, 'Andhra Pradesh', 'YSR Kadapa', 'Mydukur', 'Mydukur');
INSERT INTO public.admin_masterdata_location VALUES (488, 'Andhra Pradesh', 'YSR Kadapa', 'Mydukur', 'Duvvur');
INSERT INTO public.admin_masterdata_location VALUES (489, 'Andhra Pradesh', 'YSR Kadapa', 'Mydukur', 'S.Mydukur');
INSERT INTO public.admin_masterdata_location VALUES (490, 'Andhra Pradesh', 'YSR Kadapa', 'Mydukur', 'Brahmamgarimattam');
INSERT INTO public.admin_masterdata_location VALUES (491, 'Andhra Pradesh', 'YSR Kadapa', 'Mydukur', 'Khajipet');
INSERT INTO public.admin_masterdata_location VALUES (492, 'Andhra Pradesh', 'YSR Kadapa', 'Mydukur', 'Chapad');
INSERT INTO public.admin_masterdata_location VALUES (493, 'Andhra Pradesh', 'Annamayya', 'Rajampet', 'Rajampet');
INSERT INTO public.admin_masterdata_location VALUES (494, 'Andhra Pradesh', 'Annamayya', 'Rajampet', 'Nandalur');
INSERT INTO public.admin_masterdata_location VALUES (495, 'Andhra Pradesh', 'Annamayya', 'Rajampet', 'Veeraballe');
INSERT INTO public.admin_masterdata_location VALUES (496, 'Andhra Pradesh', 'Annamayya', 'Rajampet', 'Vontimitta');
INSERT INTO public.admin_masterdata_location VALUES (497, 'Andhra Pradesh', 'Annamayya', 'Rajampet', 'Siddavatam');
INSERT INTO public.admin_masterdata_location VALUES (498, 'Andhra Pradesh', 'Annamayya', 'Rajampet', 'T.Sundupalle');
INSERT INTO public.admin_masterdata_location VALUES (499, 'Andhra Pradesh', 'Annamayya', 'Kodur', 'Kodur');
INSERT INTO public.admin_masterdata_location VALUES (500, 'Andhra Pradesh', 'Annamayya', 'Kodur', 'Obulavaripalle');
INSERT INTO public.admin_masterdata_location VALUES (501, 'Andhra Pradesh', 'Annamayya', 'Kodur', 'Chitvel');
INSERT INTO public.admin_masterdata_location VALUES (502, 'Andhra Pradesh', 'Annamayya', 'Kodur', 'Pullampeta');
INSERT INTO public.admin_masterdata_location VALUES (503, 'Andhra Pradesh', 'Annamayya', 'Kodur', 'Penagaluru');
INSERT INTO public.admin_masterdata_location VALUES (504, 'Andhra Pradesh', 'Annamayya', 'Rayachoti', 'Rayachoti');
INSERT INTO public.admin_masterdata_location VALUES (505, 'Andhra Pradesh', 'Annamayya', 'Rayachoti', 'Sambepalli');
INSERT INTO public.admin_masterdata_location VALUES (506, 'Andhra Pradesh', 'Annamayya', 'Rayachoti', 'Chinnamandem');
INSERT INTO public.admin_masterdata_location VALUES (507, 'Andhra Pradesh', 'Annamayya', 'Rayachoti', 'Galiveedu');
INSERT INTO public.admin_masterdata_location VALUES (508, 'Andhra Pradesh', 'Annamayya', 'Rayachoti', 'Lakkireddipalli');
INSERT INTO public.admin_masterdata_location VALUES (509, 'Andhra Pradesh', 'Annamayya', 'Rayachoti', 'Ramapuram');
INSERT INTO public.admin_masterdata_location VALUES (510, 'Andhra Pradesh', 'Annamayya', 'Thamballapalle', 'Thamballapalle');
INSERT INTO public.admin_masterdata_location VALUES (511, 'Andhra Pradesh', 'Annamayya', 'Thamballapalle', 'Mulakalacheruvu');
INSERT INTO public.admin_masterdata_location VALUES (512, 'Andhra Pradesh', 'Annamayya', 'Thamballapalle', 'Peddamandyam');
INSERT INTO public.admin_masterdata_location VALUES (513, 'Andhra Pradesh', 'Annamayya', 'Thamballapalle', 'Kurabalakota');
INSERT INTO public.admin_masterdata_location VALUES (514, 'Andhra Pradesh', 'Annamayya', 'Thamballapalle', 'Peddathippasamudram');
INSERT INTO public.admin_masterdata_location VALUES (515, 'Andhra Pradesh', 'Annamayya', 'Thamballapalle', 'B.Kothakota');
INSERT INTO public.admin_masterdata_location VALUES (516, 'Andhra Pradesh', 'Annamayya', 'Pileru', 'Pileru');
INSERT INTO public.admin_masterdata_location VALUES (517, 'Andhra Pradesh', 'Annamayya', 'Pileru', 'Gurramkonda');
INSERT INTO public.admin_masterdata_location VALUES (518, 'Andhra Pradesh', 'Annamayya', 'Pileru', 'Kalakada');
INSERT INTO public.admin_masterdata_location VALUES (519, 'Andhra Pradesh', 'Annamayya', 'Pileru', 'K.V. Palle');
INSERT INTO public.admin_masterdata_location VALUES (520, 'Andhra Pradesh', 'Annamayya', 'Pileru', 'Valmikipuram');
INSERT INTO public.admin_masterdata_location VALUES (521, 'Andhra Pradesh', 'Annamayya', 'Pileru', 'Chinthaparthi');
INSERT INTO public.admin_masterdata_location VALUES (522, 'Andhra Pradesh', 'Annamayya', 'Madanapalle', 'Madanapalle');
INSERT INTO public.admin_masterdata_location VALUES (523, 'Andhra Pradesh', 'Annamayya', 'Madanapalle', 'Nimmanapalle');
INSERT INTO public.admin_masterdata_location VALUES (524, 'Andhra Pradesh', 'Annamayya', 'Madanapalle', 'Ramasamudram');
INSERT INTO public.admin_masterdata_location VALUES (525, 'Andhra Pradesh', 'Nandyal', 'Allagadda', 'Allagadda');
INSERT INTO public.admin_masterdata_location VALUES (526, 'Andhra Pradesh', 'Nandyal', 'Allagadda', 'Dornipadu');
INSERT INTO public.admin_masterdata_location VALUES (527, 'Andhra Pradesh', 'Nandyal', 'Allagadda', 'Uyyalawada');
INSERT INTO public.admin_masterdata_location VALUES (528, 'Andhra Pradesh', 'Nandyal', 'Allagadda', 'Chagalamarri');
INSERT INTO public.admin_masterdata_location VALUES (529, 'Andhra Pradesh', 'Nandyal', 'Allagadda', 'Rudravaram');
INSERT INTO public.admin_masterdata_location VALUES (530, 'Andhra Pradesh', 'Nandyal', 'Allagadda', 'Sirivella');
INSERT INTO public.admin_masterdata_location VALUES (531, 'Andhra Pradesh', 'Nandyal', 'Srisailam', 'Srisailam');
INSERT INTO public.admin_masterdata_location VALUES (532, 'Andhra Pradesh', 'Nandyal', 'Srisailam', 'Atmakur');
INSERT INTO public.admin_masterdata_location VALUES (533, 'Andhra Pradesh', 'Nandyal', 'Srisailam', 'Velgode');
INSERT INTO public.admin_masterdata_location VALUES (534, 'Andhra Pradesh', 'Nandyal', 'Srisailam', 'Bandi Atmakur');
INSERT INTO public.admin_masterdata_location VALUES (535, 'Andhra Pradesh', 'Nandyal', 'Srisailam', 'Mahanandi');
INSERT INTO public.admin_masterdata_location VALUES (536, 'Andhra Pradesh', 'Nandyal', 'Nandikotkur', 'Nandikotkur');
INSERT INTO public.admin_masterdata_location VALUES (537, 'Andhra Pradesh', 'Nandyal', 'Nandikotkur', 'Pagidyala');
INSERT INTO public.admin_masterdata_location VALUES (538, 'Andhra Pradesh', 'Nandyal', 'Nandikotkur', 'Jupadu Bungalow');
INSERT INTO public.admin_masterdata_location VALUES (539, 'Andhra Pradesh', 'Nandyal', 'Nandikotkur', 'Kothapalle');
INSERT INTO public.admin_masterdata_location VALUES (540, 'Andhra Pradesh', 'Nandyal', 'Nandikotkur', 'Pamulapadu');
INSERT INTO public.admin_masterdata_location VALUES (541, 'Andhra Pradesh', 'Nandyal', 'Nandikotkur', 'Midthur');
INSERT INTO public.admin_masterdata_location VALUES (542, 'Andhra Pradesh', 'Nandyal', 'Panyam', 'Panyam');
INSERT INTO public.admin_masterdata_location VALUES (543, 'Andhra Pradesh', 'Nandyal', 'Panyam', 'Gadivemula');
INSERT INTO public.admin_masterdata_location VALUES (544, 'Andhra Pradesh', 'Nandyal', 'Panyam', 'Kallur');
INSERT INTO public.admin_masterdata_location VALUES (545, 'Andhra Pradesh', 'Nandyal', 'Panyam', 'Orvakal');
INSERT INTO public.admin_masterdata_location VALUES (546, 'Andhra Pradesh', 'Nandyal', 'Nandyal', 'Nandyal');
INSERT INTO public.admin_masterdata_location VALUES (547, 'Andhra Pradesh', 'Nandyal', 'Nandyal', 'Gospadu');
INSERT INTO public.admin_masterdata_location VALUES (548, 'Andhra Pradesh', 'Nandyal', 'Banaganapalle', 'Banaganapalle');
INSERT INTO public.admin_masterdata_location VALUES (549, 'Andhra Pradesh', 'Nandyal', 'Banaganapalle', 'Owk');
INSERT INTO public.admin_masterdata_location VALUES (550, 'Andhra Pradesh', 'Nandyal', 'Banaganapalle', 'Koilakuntla');
INSERT INTO public.admin_masterdata_location VALUES (551, 'Andhra Pradesh', 'Nandyal', 'Banaganapalle', 'Sanjamala');
INSERT INTO public.admin_masterdata_location VALUES (552, 'Andhra Pradesh', 'Nandyal', 'Banaganapalle', 'Kolimigundla');
INSERT INTO public.admin_masterdata_location VALUES (553, 'Andhra Pradesh', 'Nandyal', 'Dhone', 'Dhone');
INSERT INTO public.admin_masterdata_location VALUES (554, 'Andhra Pradesh', 'Nandyal', 'Dhone', 'Bethamcherla');
INSERT INTO public.admin_masterdata_location VALUES (555, 'Andhra Pradesh', 'Nandyal', 'Dhone', 'Peapully');
INSERT INTO public.admin_masterdata_location VALUES (556, 'Andhra Pradesh', 'Kurnool', 'Kurnool', 'Kurnool Urban');
INSERT INTO public.admin_masterdata_location VALUES (557, 'Andhra Pradesh', 'Kurnool', 'Pattikonda', 'Pattikonda');
INSERT INTO public.admin_masterdata_location VALUES (558, 'Andhra Pradesh', 'Kurnool', 'Pattikonda', 'Maddikera');
INSERT INTO public.admin_masterdata_location VALUES (559, 'Andhra Pradesh', 'Kurnool', 'Pattikonda', 'Tuggali');
INSERT INTO public.admin_masterdata_location VALUES (560, 'Andhra Pradesh', 'Kurnool', 'Pattikonda', 'Veldurthi');
INSERT INTO public.admin_masterdata_location VALUES (561, 'Andhra Pradesh', 'Kurnool', 'Pattikonda', 'Krishnagiri');
INSERT INTO public.admin_masterdata_location VALUES (562, 'Andhra Pradesh', 'Kurnool', 'Kodumur', 'Kodumur');
INSERT INTO public.admin_masterdata_location VALUES (563, 'Andhra Pradesh', 'Kurnool', 'Kodumur', 'C.Belagal');
INSERT INTO public.admin_masterdata_location VALUES (564, 'Andhra Pradesh', 'Kurnool', 'Kodumur', 'Gudur');
INSERT INTO public.admin_masterdata_location VALUES (565, 'Andhra Pradesh', 'Kurnool', 'Kodumur', 'Kurnool Rural (Part)');
INSERT INTO public.admin_masterdata_location VALUES (566, 'Andhra Pradesh', 'Kurnool', 'Yemmiganur', 'Yemmiganur');
INSERT INTO public.admin_masterdata_location VALUES (567, 'Andhra Pradesh', 'Kurnool', 'Yemmiganur', 'Nandavaram');
INSERT INTO public.admin_masterdata_location VALUES (568, 'Andhra Pradesh', 'Kurnool', 'Yemmiganur', 'Gonegandla');
INSERT INTO public.admin_masterdata_location VALUES (569, 'Andhra Pradesh', 'Kurnool', 'Mantralayam', 'Mantralayam');
INSERT INTO public.admin_masterdata_location VALUES (570, 'Andhra Pradesh', 'Kurnool', 'Mantralayam', 'Kosigi');
INSERT INTO public.admin_masterdata_location VALUES (571, 'Andhra Pradesh', 'Kurnool', 'Mantralayam', 'Kowthalam');
INSERT INTO public.admin_masterdata_location VALUES (572, 'Andhra Pradesh', 'Kurnool', 'Mantralayam', 'Peddakadubur');
INSERT INTO public.admin_masterdata_location VALUES (573, 'Andhra Pradesh', 'Kurnool', 'Adoni', 'Adoni');
INSERT INTO public.admin_masterdata_location VALUES (574, 'Andhra Pradesh', 'Kurnool', 'Alur', 'Alur');
INSERT INTO public.admin_masterdata_location VALUES (575, 'Andhra Pradesh', 'Kurnool', 'Alur', 'Aspari');
INSERT INTO public.admin_masterdata_location VALUES (576, 'Andhra Pradesh', 'Kurnool', 'Alur', 'Devanakonda');
INSERT INTO public.admin_masterdata_location VALUES (577, 'Andhra Pradesh', 'Kurnool', 'Alur', 'Chippagiri');
INSERT INTO public.admin_masterdata_location VALUES (578, 'Andhra Pradesh', 'Kurnool', 'Alur', 'Halaharvi');
INSERT INTO public.admin_masterdata_location VALUES (579, 'Andhra Pradesh', 'Kurnool', 'Alur', 'Holagunda');
INSERT INTO public.admin_masterdata_location VALUES (580, 'Andhra Pradesh', 'Ananthapuramu', 'Rayadurg', 'Rayadurg');
INSERT INTO public.admin_masterdata_location VALUES (581, 'Andhra Pradesh', 'Ananthapuramu', 'Rayadurg', 'D.Hirehal');
INSERT INTO public.admin_masterdata_location VALUES (582, 'Andhra Pradesh', 'Ananthapuramu', 'Rayadurg', 'Kanekal');
INSERT INTO public.admin_masterdata_location VALUES (583, 'Andhra Pradesh', 'Ananthapuramu', 'Rayadurg', 'Bommanahal');
INSERT INTO public.admin_masterdata_location VALUES (584, 'Andhra Pradesh', 'Ananthapuramu', 'Rayadurg', 'Gummaghatta');
INSERT INTO public.admin_masterdata_location VALUES (585, 'Andhra Pradesh', 'Ananthapuramu', 'Uravakonda', 'Uravakonda');
INSERT INTO public.admin_masterdata_location VALUES (586, 'Andhra Pradesh', 'Ananthapuramu', 'Uravakonda', 'Beluguppa');
INSERT INTO public.admin_masterdata_location VALUES (587, 'Andhra Pradesh', 'Ananthapuramu', 'Uravakonda', 'Kudair');
INSERT INTO public.admin_masterdata_location VALUES (588, 'Andhra Pradesh', 'Ananthapuramu', 'Uravakonda', 'Vajrakarur');
INSERT INTO public.admin_masterdata_location VALUES (589, 'Andhra Pradesh', 'Ananthapuramu', 'Uravakonda', 'Vidapanakal');
INSERT INTO public.admin_masterdata_location VALUES (590, 'Andhra Pradesh', 'Ananthapuramu', 'Guntakal', 'Guntakal');
INSERT INTO public.admin_masterdata_location VALUES (591, 'Andhra Pradesh', 'Ananthapuramu', 'Guntakal', 'Gooty');
INSERT INTO public.admin_masterdata_location VALUES (592, 'Andhra Pradesh', 'Ananthapuramu', 'Guntakal', 'Pamidi');
INSERT INTO public.admin_masterdata_location VALUES (593, 'Andhra Pradesh', 'Ananthapuramu', 'Tadipatri', 'Tadipatri');
INSERT INTO public.admin_masterdata_location VALUES (594, 'Andhra Pradesh', 'Ananthapuramu', 'Tadipatri', 'Peddavadugur');
INSERT INTO public.admin_masterdata_location VALUES (595, 'Andhra Pradesh', 'Ananthapuramu', 'Tadipatri', 'Yadiki');
INSERT INTO public.admin_masterdata_location VALUES (596, 'Andhra Pradesh', 'Ananthapuramu', 'Tadipatri', 'Peddapappur');
INSERT INTO public.admin_masterdata_location VALUES (597, 'Andhra Pradesh', 'Ananthapuramu', 'Singanamala', 'Singanamala');
INSERT INTO public.admin_masterdata_location VALUES (598, 'Andhra Pradesh', 'Ananthapuramu', 'Singanamala', 'Garladinne');
INSERT INTO public.admin_masterdata_location VALUES (599, 'Andhra Pradesh', 'Ananthapuramu', 'Singanamala', 'Putlur');
INSERT INTO public.admin_masterdata_location VALUES (600, 'Andhra Pradesh', 'Ananthapuramu', 'Singanamala', 'Yellanur');
INSERT INTO public.admin_masterdata_location VALUES (601, 'Andhra Pradesh', 'Ananthapuramu', 'Singanamala', 'Narpala');
INSERT INTO public.admin_masterdata_location VALUES (602, 'Andhra Pradesh', 'Ananthapuramu', 'Singanamala', 'Bukkarayasamudram');
INSERT INTO public.admin_masterdata_location VALUES (603, 'Andhra Pradesh', 'Ananthapuramu', 'Anantapur Urban', 'Anantapur');
INSERT INTO public.admin_masterdata_location VALUES (604, 'Andhra Pradesh', 'Ananthapuramu', 'Kalyandurg', 'Kalyandurg');
INSERT INTO public.admin_masterdata_location VALUES (605, 'Andhra Pradesh', 'Ananthapuramu', 'Kalyandurg', 'Brahmasamudram');
INSERT INTO public.admin_masterdata_location VALUES (606, 'Andhra Pradesh', 'Ananthapuramu', 'Kalyandurg', 'Settur');
INSERT INTO public.admin_masterdata_location VALUES (607, 'Andhra Pradesh', 'Ananthapuramu', 'Kalyandurg', 'Kundurpi');
INSERT INTO public.admin_masterdata_location VALUES (608, 'Andhra Pradesh', 'Ananthapuramu', 'Kalyandurg', 'Kambadur');
INSERT INTO public.admin_masterdata_location VALUES (609, 'Andhra Pradesh', 'Ananthapuramu', 'Raptadu', 'Raptadu');
INSERT INTO public.admin_masterdata_location VALUES (610, 'Andhra Pradesh', 'Ananthapuramu', 'Raptadu', 'Atmakur');
INSERT INTO public.admin_masterdata_location VALUES (611, 'Andhra Pradesh', 'Ananthapuramu', 'Raptadu', 'Kanaganapalle');
INSERT INTO public.admin_masterdata_location VALUES (612, 'Andhra Pradesh', 'Ananthapuramu', 'Raptadu', 'C.K. Palle');
INSERT INTO public.admin_masterdata_location VALUES (613, 'Andhra Pradesh', 'Ananthapuramu', 'Raptadu', 'Ramagiri');
INSERT INTO public.admin_masterdata_location VALUES (614, 'Andhra Pradesh', 'Sri Sathya Sai', 'Madakasira', 'Madakasira');
INSERT INTO public.admin_masterdata_location VALUES (615, 'Andhra Pradesh', 'Sri Sathya Sai', 'Madakasira', 'Amarapuram');
INSERT INTO public.admin_masterdata_location VALUES (616, 'Andhra Pradesh', 'Sri Sathya Sai', 'Madakasira', 'Gudibanda');
INSERT INTO public.admin_masterdata_location VALUES (617, 'Andhra Pradesh', 'Sri Sathya Sai', 'Madakasira', 'Rolla');
INSERT INTO public.admin_masterdata_location VALUES (618, 'Andhra Pradesh', 'Sri Sathya Sai', 'Madakasira', 'Agali');
INSERT INTO public.admin_masterdata_location VALUES (619, 'Andhra Pradesh', 'Sri Sathya Sai', 'Hindupur', 'Hindupur');
INSERT INTO public.admin_masterdata_location VALUES (620, 'Andhra Pradesh', 'Sri Sathya Sai', 'Hindupur', 'Lepakshi');
INSERT INTO public.admin_masterdata_location VALUES (621, 'Andhra Pradesh', 'Sri Sathya Sai', 'Hindupur', 'Chilamathur');
INSERT INTO public.admin_masterdata_location VALUES (622, 'Andhra Pradesh', 'Sri Sathya Sai', 'Penukonda', 'Penukonda');
INSERT INTO public.admin_masterdata_location VALUES (623, 'Andhra Pradesh', 'Sri Sathya Sai', 'Penukonda', 'Roddam');
INSERT INTO public.admin_masterdata_location VALUES (624, 'Andhra Pradesh', 'Sri Sathya Sai', 'Penukonda', 'Somandepalle');
INSERT INTO public.admin_masterdata_location VALUES (625, 'Andhra Pradesh', 'Sri Sathya Sai', 'Penukonda', 'Gorantla');
INSERT INTO public.admin_masterdata_location VALUES (626, 'Andhra Pradesh', 'Sri Sathya Sai', 'Penukonda', 'Parigi');
INSERT INTO public.admin_masterdata_location VALUES (627, 'Andhra Pradesh', 'Sri Sathya Sai', 'Puttaparthi', 'Puttaparthi');
INSERT INTO public.admin_masterdata_location VALUES (628, 'Andhra Pradesh', 'Sri Sathya Sai', 'Puttaparthi', 'Nallamada');
INSERT INTO public.admin_masterdata_location VALUES (629, 'Andhra Pradesh', 'Sri Sathya Sai', 'Puttaparthi', 'Bukkapatnam');
INSERT INTO public.admin_masterdata_location VALUES (630, 'Andhra Pradesh', 'Sri Sathya Sai', 'Puttaparthi', 'Kothacheruvu');
INSERT INTO public.admin_masterdata_location VALUES (631, 'Andhra Pradesh', 'Sri Sathya Sai', 'Puttaparthi', 'O.D.Cheruvu');
INSERT INTO public.admin_masterdata_location VALUES (632, 'Andhra Pradesh', 'Sri Sathya Sai', 'Puttaparthi', 'Amadagur');
INSERT INTO public.admin_masterdata_location VALUES (633, 'Andhra Pradesh', 'Sri Sathya Sai', 'Dharmavaram', 'Dharmavaram');
INSERT INTO public.admin_masterdata_location VALUES (634, 'Andhra Pradesh', 'Sri Sathya Sai', 'Dharmavaram', 'Bathalapalle');
INSERT INTO public.admin_masterdata_location VALUES (635, 'Andhra Pradesh', 'Sri Sathya Sai', 'Dharmavaram', 'Tadimarri');
INSERT INTO public.admin_masterdata_location VALUES (636, 'Andhra Pradesh', 'Sri Sathya Sai', 'Dharmavaram', 'Mudigubba');
INSERT INTO public.admin_masterdata_location VALUES (637, 'Andhra Pradesh', 'Sri Sathya Sai', 'Kadiri', 'Kadiri');
INSERT INTO public.admin_masterdata_location VALUES (638, 'Andhra Pradesh', 'Sri Sathya Sai', 'Kadiri', 'Talupula');
INSERT INTO public.admin_masterdata_location VALUES (639, 'Andhra Pradesh', 'Sri Sathya Sai', 'Kadiri', 'Nambulipulikunta');
INSERT INTO public.admin_masterdata_location VALUES (640, 'Andhra Pradesh', 'Sri Sathya Sai', 'Kadiri', 'Gandlapenta');
INSERT INTO public.admin_masterdata_location VALUES (641, 'Andhra Pradesh', 'Sri Sathya Sai', 'Kadiri', 'Nallacheruvu');
INSERT INTO public.admin_masterdata_location VALUES (642, 'Andhra Pradesh', 'Sri Sathya Sai', 'Kadiri', 'Tanakal');
INSERT INTO public.admin_masterdata_location VALUES (643, 'Andhra Pradesh', 'Sri Sathya Sai', 'Kadiri', 'Talupula');
INSERT INTO public.admin_masterdata_location VALUES (644, 'Andhra Pradesh', 'Chittoor', 'Punganur', 'Punganur');
INSERT INTO public.admin_masterdata_location VALUES (645, 'Andhra Pradesh', 'Chittoor', 'Punganur', 'Chowdepalle');
INSERT INTO public.admin_masterdata_location VALUES (646, 'Andhra Pradesh', 'Chittoor', 'Punganur', 'Sodam');
INSERT INTO public.admin_masterdata_location VALUES (647, 'Andhra Pradesh', 'Chittoor', 'Punganur', 'Somala');
INSERT INTO public.admin_masterdata_location VALUES (648, 'Andhra Pradesh', 'Chittoor', 'Punganur', 'Peddapanjani');
INSERT INTO public.admin_masterdata_location VALUES (649, 'Andhra Pradesh', 'Chittoor', 'Punganur', 'Pulicherla');
INSERT INTO public.admin_masterdata_location VALUES (650, 'Andhra Pradesh', 'Chittoor', 'Punganur', 'Rompcicherla');
INSERT INTO public.admin_masterdata_location VALUES (651, 'Andhra Pradesh', 'Chittoor', 'Nagari', 'Nagari');
INSERT INTO public.admin_masterdata_location VALUES (652, 'Andhra Pradesh', 'Chittoor', 'Nagari', 'Nindra');
INSERT INTO public.admin_masterdata_location VALUES (653, 'Andhra Pradesh', 'Chittoor', 'Nagari', 'Vijayapuram');
INSERT INTO public.admin_masterdata_location VALUES (654, 'Andhra Pradesh', 'Chittoor', 'Nagari', 'Puttur');
INSERT INTO public.admin_masterdata_location VALUES (655, 'Andhra Pradesh', 'Chittoor', 'Nagari', 'Vadamalapeta');
INSERT INTO public.admin_masterdata_location VALUES (656, 'Andhra Pradesh', 'Chittoor', 'Gangadhara Nellore', 'Gangadhara Nellore');
INSERT INTO public.admin_masterdata_location VALUES (657, 'Andhra Pradesh', 'Chittoor', 'Gangadhara Nellore', 'Penumuru');
INSERT INTO public.admin_masterdata_location VALUES (658, 'Andhra Pradesh', 'Chittoor', 'Gangadhara Nellore', 'Vedurukuppam');
INSERT INTO public.admin_masterdata_location VALUES (659, 'Andhra Pradesh', 'Chittoor', 'Gangadhara Nellore', 'Karvetinagar');
INSERT INTO public.admin_masterdata_location VALUES (660, 'Andhra Pradesh', 'Chittoor', 'Gangadhara Nellore', 'S.R.Puram');
INSERT INTO public.admin_masterdata_location VALUES (661, 'Andhra Pradesh', 'Chittoor', 'Gangadhara Nellore', 'Palasamudram');
INSERT INTO public.admin_masterdata_location VALUES (662, 'Andhra Pradesh', 'Chittoor', 'Chittoor', 'Chittoor');
INSERT INTO public.admin_masterdata_location VALUES (663, 'Andhra Pradesh', 'Chittoor', 'Chittoor', 'Gudipala');
INSERT INTO public.admin_masterdata_location VALUES (664, 'Andhra Pradesh', 'Chittoor', 'Puthalapattu', 'Puthalapattu');
INSERT INTO public.admin_masterdata_location VALUES (665, 'Andhra Pradesh', 'Chittoor', 'Puthalapattu', 'Irala');
INSERT INTO public.admin_masterdata_location VALUES (666, 'Andhra Pradesh', 'Chittoor', 'Puthalapattu', 'Thavanampalle');
INSERT INTO public.admin_masterdata_location VALUES (667, 'Andhra Pradesh', 'Chittoor', 'Puthalapattu', 'Bangarupalem');
INSERT INTO public.admin_masterdata_location VALUES (668, 'Andhra Pradesh', 'Chittoor', 'Puthalapattu', 'Yadamari');
INSERT INTO public.admin_masterdata_location VALUES (669, 'Andhra Pradesh', 'Chittoor', 'Palamaner', 'Palamaner');
INSERT INTO public.admin_masterdata_location VALUES (670, 'Andhra Pradesh', 'Chittoor', 'Palamaner', 'Gangavaram');
INSERT INTO public.admin_masterdata_location VALUES (671, 'Andhra Pradesh', 'Chittoor', 'Palamaner', 'Baireddipalle');
INSERT INTO public.admin_masterdata_location VALUES (672, 'Andhra Pradesh', 'Chittoor', 'Palamaner', 'V.Kota');
INSERT INTO public.admin_masterdata_location VALUES (673, 'Andhra Pradesh', 'Chittoor', 'Palamaner', 'Peddapanjani');
INSERT INTO public.admin_masterdata_location VALUES (674, 'Andhra Pradesh', 'Chittoor', 'Kuppam', 'Kuppam');
INSERT INTO public.admin_masterdata_location VALUES (675, 'Andhra Pradesh', 'Chittoor', 'Kuppam', 'Shanthipuram');
INSERT INTO public.admin_masterdata_location VALUES (676, 'Andhra Pradesh', 'Chittoor', 'Kuppam', 'Gudupalle');
INSERT INTO public.admin_masterdata_location VALUES (677, 'Andhra Pradesh', 'Chittoor', 'Kuppam', 'Ramakuppam');
INSERT INTO public.admin_masterdata_location VALUES (678, 'Telangana', 'Adilabad', 'Sirpur', 'Sirpur (T)');
INSERT INTO public.admin_masterdata_location VALUES (679, 'Telangana', 'Adilabad', 'Sirpur', 'Kouthala');
INSERT INTO public.admin_masterdata_location VALUES (680, 'Telangana', 'Adilabad', 'Sirpur', 'Bejjur');
INSERT INTO public.admin_masterdata_location VALUES (681, 'Telangana', 'Adilabad', 'Sirpur', 'Dahegaon');
INSERT INTO public.admin_masterdata_location VALUES (682, 'Telangana', 'Adilabad', 'Sirpur', 'Penchikalpet');
INSERT INTO public.admin_masterdata_location VALUES (683, 'Telangana', 'Adilabad', 'Sirpur', 'Chintalamanepally');
INSERT INTO public.admin_masterdata_location VALUES (684, 'Telangana', 'Adilabad', 'Sirpur', 'Kagaznagar');
INSERT INTO public.admin_masterdata_location VALUES (685, 'Telangana', 'Adilabad', 'Chennur', 'Chennur');
INSERT INTO public.admin_masterdata_location VALUES (686, 'Telangana', 'Adilabad', 'Chennur', 'Kotapally');
INSERT INTO public.admin_masterdata_location VALUES (687, 'Telangana', 'Adilabad', 'Chennur', 'Jaipur');
INSERT INTO public.admin_masterdata_location VALUES (688, 'Telangana', 'Adilabad', 'Chennur', 'Mandamarri');
INSERT INTO public.admin_masterdata_location VALUES (689, 'Telangana', 'Adilabad', 'Chennur', 'Bheemaram');
INSERT INTO public.admin_masterdata_location VALUES (690, 'Telangana', 'Adilabad', 'Bellampalli', 'Bellampalli');
INSERT INTO public.admin_masterdata_location VALUES (691, 'Telangana', 'Adilabad', 'Bellampalli', 'Vemanpally');
INSERT INTO public.admin_masterdata_location VALUES (692, 'Telangana', 'Adilabad', 'Bellampalli', 'Nennel');
INSERT INTO public.admin_masterdata_location VALUES (693, 'Telangana', 'Adilabad', 'Bellampalli', 'Kasipet');
INSERT INTO public.admin_masterdata_location VALUES (694, 'Telangana', 'Adilabad', 'Bellampalli', 'Bhimini');
INSERT INTO public.admin_masterdata_location VALUES (695, 'Telangana', 'Adilabad', 'Bellampalli', 'Kannepally');
INSERT INTO public.admin_masterdata_location VALUES (696, 'Telangana', 'Adilabad', 'Bellampalli', 'Tandur');
INSERT INTO public.admin_masterdata_location VALUES (697, 'Telangana', 'Adilabad', 'Mancherial', 'Mancherial');
INSERT INTO public.admin_masterdata_location VALUES (698, 'Telangana', 'Adilabad', 'Mancherial', 'Naspur');
INSERT INTO public.admin_masterdata_location VALUES (699, 'Telangana', 'Adilabad', 'Mancherial', 'Hajipur');
INSERT INTO public.admin_masterdata_location VALUES (700, 'Telangana', 'Adilabad', 'Mancherial', 'Luxettipet');
INSERT INTO public.admin_masterdata_location VALUES (701, 'Telangana', 'Adilabad', 'Mancherial', 'Dandepally');
INSERT INTO public.admin_masterdata_location VALUES (702, 'Telangana', 'Adilabad', 'Asifabad', 'Asifabad');
INSERT INTO public.admin_masterdata_location VALUES (703, 'Telangana', 'Adilabad', 'Asifabad', 'Jainoor');
INSERT INTO public.admin_masterdata_location VALUES (704, 'Telangana', 'Adilabad', 'Asifabad', 'Tiryani');
INSERT INTO public.admin_masterdata_location VALUES (705, 'Telangana', 'Adilabad', 'Asifabad', 'Kerameri');
INSERT INTO public.admin_masterdata_location VALUES (706, 'Telangana', 'Adilabad', 'Asifabad', 'Wankdi');
INSERT INTO public.admin_masterdata_location VALUES (707, 'Telangana', 'Adilabad', 'Asifabad', 'Rebbena');
INSERT INTO public.admin_masterdata_location VALUES (708, 'Telangana', 'Adilabad', 'Asifabad', 'Sirpur (U)');
INSERT INTO public.admin_masterdata_location VALUES (709, 'Telangana', 'Adilabad', 'Asifabad', 'Lingapur');
INSERT INTO public.admin_masterdata_location VALUES (710, 'Telangana', 'Adilabad', 'Adilabad', 'Adilabad');
INSERT INTO public.admin_masterdata_location VALUES (711, 'Telangana', 'Adilabad', 'Adilabad', 'Jainad');
INSERT INTO public.admin_masterdata_location VALUES (712, 'Telangana', 'Adilabad', 'Adilabad', 'Bela');
INSERT INTO public.admin_masterdata_location VALUES (713, 'Telangana', 'Adilabad', 'Adilabad', 'Mavala');
INSERT INTO public.admin_masterdata_location VALUES (714, 'Telangana', 'Adilabad', 'Boath', 'Boath');
INSERT INTO public.admin_masterdata_location VALUES (715, 'Telangana', 'Adilabad', 'Boath', 'Bazarhathnoor');
INSERT INTO public.admin_masterdata_location VALUES (716, 'Telangana', 'Adilabad', 'Boath', 'Neradigonda');
INSERT INTO public.admin_masterdata_location VALUES (717, 'Telangana', 'Adilabad', 'Boath', 'Ichoda');
INSERT INTO public.admin_masterdata_location VALUES (718, 'Telangana', 'Adilabad', 'Boath', 'Gudihathnoor');
INSERT INTO public.admin_masterdata_location VALUES (719, 'Telangana', 'Adilabad', 'Boath', 'Talamadugu');
INSERT INTO public.admin_masterdata_location VALUES (720, 'Telangana', 'Adilabad', 'Boath', 'Tamsi');
INSERT INTO public.admin_masterdata_location VALUES (721, 'Telangana', 'Adilabad', 'Nirmal', 'Nirmal');
INSERT INTO public.admin_masterdata_location VALUES (722, 'Telangana', 'Adilabad', 'Nirmal', 'Dilawarpur');
INSERT INTO public.admin_masterdata_location VALUES (723, 'Telangana', 'Adilabad', 'Nirmal', 'Laxmanchanda');
INSERT INTO public.admin_masterdata_location VALUES (724, 'Telangana', 'Adilabad', 'Nirmal', 'Mamda');
INSERT INTO public.admin_masterdata_location VALUES (725, 'Telangana', 'Adilabad', 'Nirmal', 'Sarangapur');
INSERT INTO public.admin_masterdata_location VALUES (726, 'Telangana', 'Adilabad', 'Nirmal', 'Narsapur (G)');
INSERT INTO public.admin_masterdata_location VALUES (727, 'Telangana', 'Adilabad', 'Nirmal', 'Soan');
INSERT INTO public.admin_masterdata_location VALUES (728, 'Telangana', 'Adilabad', 'Mudhole', 'Mudhole');
INSERT INTO public.admin_masterdata_location VALUES (729, 'Telangana', 'Adilabad', 'Mudhole', 'Bhainsa');
INSERT INTO public.admin_masterdata_location VALUES (730, 'Telangana', 'Adilabad', 'Mudhole', 'Kubeer');
INSERT INTO public.admin_masterdata_location VALUES (731, 'Telangana', 'Adilabad', 'Mudhole', 'Tanur');
INSERT INTO public.admin_masterdata_location VALUES (732, 'Telangana', 'Adilabad', 'Mudhole', 'Lokeshwaram');
INSERT INTO public.admin_masterdata_location VALUES (733, 'Telangana', 'Adilabad', 'Mudhole', 'Basar');
INSERT INTO public.admin_masterdata_location VALUES (734, 'Telangana', 'Adilabad', 'Khanapur', 'Khanapur');
INSERT INTO public.admin_masterdata_location VALUES (735, 'Telangana', 'Adilabad', 'Khanapur', 'Kaddam');
INSERT INTO public.admin_masterdata_location VALUES (736, 'Telangana', 'Adilabad', 'Khanapur', 'Dasturabad');
INSERT INTO public.admin_masterdata_location VALUES (737, 'Telangana', 'Adilabad', 'Khanapur', 'Jannaram');
INSERT INTO public.admin_masterdata_location VALUES (738, 'Telangana', 'Adilabad', 'Khanapur', 'Pembi');
INSERT INTO public.admin_masterdata_location VALUES (739, 'Telangana', 'Nizamabad', 'Armur', 'Armur');
INSERT INTO public.admin_masterdata_location VALUES (740, 'Telangana', 'Nizamabad', 'Armur', 'Nandipet');
INSERT INTO public.admin_masterdata_location VALUES (741, 'Telangana', 'Nizamabad', 'Armur', 'Makloor');
INSERT INTO public.admin_masterdata_location VALUES (742, 'Telangana', 'Nizamabad', 'Armur', 'Mupkal');
INSERT INTO public.admin_masterdata_location VALUES (743, 'Telangana', 'Nizamabad', 'Armur', 'Alur');
INSERT INTO public.admin_masterdata_location VALUES (744, 'Telangana', 'Nizamabad', 'Armur', 'Donkeshwar');
INSERT INTO public.admin_masterdata_location VALUES (745, 'Telangana', 'Nizamabad', 'Bodhan', 'Bodhan');
INSERT INTO public.admin_masterdata_location VALUES (746, 'Telangana', 'Nizamabad', 'Bodhan', 'Ranjal');
INSERT INTO public.admin_masterdata_location VALUES (747, 'Telangana', 'Nizamabad', 'Bodhan', 'Navipet');
INSERT INTO public.admin_masterdata_location VALUES (748, 'Telangana', 'Nizamabad', 'Bodhan', 'Yedapally');
INSERT INTO public.admin_masterdata_location VALUES (749, 'Telangana', 'Nizamabad', 'Bodhan', 'Saloora');
INSERT INTO public.admin_masterdata_location VALUES (750, 'Telangana', 'Nizamabad', 'Jukkal', 'Jukkal');
INSERT INTO public.admin_masterdata_location VALUES (751, 'Telangana', 'Nizamabad', 'Jukkal', 'Madnoor');
INSERT INTO public.admin_masterdata_location VALUES (752, 'Telangana', 'Nizamabad', 'Jukkal', 'Bichkunda');
INSERT INTO public.admin_masterdata_location VALUES (753, 'Telangana', 'Nizamabad', 'Jukkal', 'Pitlam');
INSERT INTO public.admin_masterdata_location VALUES (754, 'Telangana', 'Nizamabad', 'Jukkal', 'Nizamsagar');
INSERT INTO public.admin_masterdata_location VALUES (755, 'Telangana', 'Nizamabad', 'Jukkal', 'Pedda Kodapgal');
INSERT INTO public.admin_masterdata_location VALUES (756, 'Telangana', 'Nizamabad', 'Jukkal', 'Dongli');
INSERT INTO public.admin_masterdata_location VALUES (757, 'Telangana', 'Nizamabad', 'Banswada', 'Banswada');
INSERT INTO public.admin_masterdata_location VALUES (758, 'Telangana', 'Nizamabad', 'Banswada', 'Birkoor');
INSERT INTO public.admin_masterdata_location VALUES (759, 'Telangana', 'Nizamabad', 'Banswada', 'Varni');
INSERT INTO public.admin_masterdata_location VALUES (760, 'Telangana', 'Nizamabad', 'Banswada', 'Nasrullabad');
INSERT INTO public.admin_masterdata_location VALUES (761, 'Telangana', 'Nizamabad', 'Banswada', 'Rudrur');
INSERT INTO public.admin_masterdata_location VALUES (762, 'Telangana', 'Nizamabad', 'Banswada', 'Chandur');
INSERT INTO public.admin_masterdata_location VALUES (763, 'Telangana', 'Nizamabad', 'Banswada', 'Mosra');
INSERT INTO public.admin_masterdata_location VALUES (764, 'Telangana', 'Nizamabad', 'Banswada', 'Kotagiri');
INSERT INTO public.admin_masterdata_location VALUES (765, 'Telangana', 'Nizamabad', 'Banswada', 'Pothangal');
INSERT INTO public.admin_masterdata_location VALUES (766, 'Telangana', 'Nizamabad', 'Yellareddy', 'Yellareddy');
INSERT INTO public.admin_masterdata_location VALUES (767, 'Telangana', 'Nizamabad', 'Yellareddy', 'Nagareddypet');
INSERT INTO public.admin_masterdata_location VALUES (768, 'Telangana', 'Nizamabad', 'Yellareddy', 'Lingampet');
INSERT INTO public.admin_masterdata_location VALUES (769, 'Telangana', 'Nizamabad', 'Yellareddy', 'Tadwai');
INSERT INTO public.admin_masterdata_location VALUES (770, 'Telangana', 'Nizamabad', 'Yellareddy', 'Gandhari');
INSERT INTO public.admin_masterdata_location VALUES (771, 'Telangana', 'Nizamabad', 'Yellareddy', 'Ramareddy');
INSERT INTO public.admin_masterdata_location VALUES (772, 'Telangana', 'Nizamabad', 'Yellareddy', 'Rajampet');
INSERT INTO public.admin_masterdata_location VALUES (773, 'Telangana', 'Nizamabad', 'Kamareddy', 'Kamareddy');
INSERT INTO public.admin_masterdata_location VALUES (774, 'Telangana', 'Nizamabad', 'Kamareddy', 'Machareddy');
INSERT INTO public.admin_masterdata_location VALUES (775, 'Telangana', 'Nizamabad', 'Kamareddy', 'Domakonda');
INSERT INTO public.admin_masterdata_location VALUES (776, 'Telangana', 'Nizamabad', 'Kamareddy', 'Bhiknoor');
INSERT INTO public.admin_masterdata_location VALUES (777, 'Telangana', 'Nizamabad', 'Kamareddy', 'Bibipet');
INSERT INTO public.admin_masterdata_location VALUES (778, 'Telangana', 'Nizamabad', 'Kamareddy', 'Rajampet');
INSERT INTO public.admin_masterdata_location VALUES (779, 'Telangana', 'Nizamabad', 'Nizamabad Urban', 'Nizamabad North');
INSERT INTO public.admin_masterdata_location VALUES (780, 'Telangana', 'Nizamabad', 'Nizamabad Urban', 'Nizamabad South');
INSERT INTO public.admin_masterdata_location VALUES (781, 'Telangana', 'Nizamabad', 'Nizamabad Rural', 'Nizamabad Rural');
INSERT INTO public.admin_masterdata_location VALUES (782, 'Telangana', 'Nizamabad', 'Nizamabad Rural', 'Jakranpally');
INSERT INTO public.admin_masterdata_location VALUES (783, 'Telangana', 'Nizamabad', 'Nizamabad Rural', 'Sirkonda');
INSERT INTO public.admin_masterdata_location VALUES (784, 'Telangana', 'Nizamabad', 'Nizamabad Rural', 'Dharpally');
INSERT INTO public.admin_masterdata_location VALUES (785, 'Telangana', 'Nizamabad', 'Nizamabad Rural', 'Indalwai');
INSERT INTO public.admin_masterdata_location VALUES (786, 'Telangana', 'Nizamabad', 'Nizamabad Rural', 'Mopal');
INSERT INTO public.admin_masterdata_location VALUES (787, 'Telangana', 'Nizamabad', 'Nizamabad Rural', 'Ditchpally');
INSERT INTO public.admin_masterdata_location VALUES (788, 'Telangana', 'Nizamabad', 'Balkonda', 'Balkonda');
INSERT INTO public.admin_masterdata_location VALUES (789, 'Telangana', 'Nizamabad', 'Balkonda', 'Morthad');
INSERT INTO public.admin_masterdata_location VALUES (790, 'Telangana', 'Nizamabad', 'Balkonda', 'Kammarpally');
INSERT INTO public.admin_masterdata_location VALUES (791, 'Telangana', 'Nizamabad', 'Balkonda', 'Velpur');
INSERT INTO public.admin_masterdata_location VALUES (792, 'Telangana', 'Nizamabad', 'Balkonda', 'Yergatla');
INSERT INTO public.admin_masterdata_location VALUES (793, 'Telangana', 'Nizamabad', 'Balkonda', 'Bheemgal');
INSERT INTO public.admin_masterdata_location VALUES (794, 'Telangana', 'Nizamabad', 'Balkonda', 'Mupkal');
INSERT INTO public.admin_masterdata_location VALUES (795, 'Telangana', 'Nizamabad', 'Balkonda', 'Mendora');
INSERT INTO public.admin_masterdata_location VALUES (796, 'Telangana', 'Karimnagar', 'Koratla', 'Koratla');
INSERT INTO public.admin_masterdata_location VALUES (797, 'Telangana', 'Karimnagar', 'Koratla', 'Metpally');
INSERT INTO public.admin_masterdata_location VALUES (798, 'Telangana', 'Karimnagar', 'Koratla', 'Ibrahimpatnam');
INSERT INTO public.admin_masterdata_location VALUES (799, 'Telangana', 'Karimnagar', 'Koratla', 'Mallapur');
INSERT INTO public.admin_masterdata_location VALUES (800, 'Telangana', 'Karimnagar', 'Jagtial', 'Jagtial');
INSERT INTO public.admin_masterdata_location VALUES (801, 'Telangana', 'Karimnagar', 'Jagtial', 'Raikal');
INSERT INTO public.admin_masterdata_location VALUES (802, 'Telangana', 'Karimnagar', 'Jagtial', 'Sarangapur');
INSERT INTO public.admin_masterdata_location VALUES (803, 'Telangana', 'Karimnagar', 'Jagtial', 'Beerpur');
INSERT INTO public.admin_masterdata_location VALUES (804, 'Telangana', 'Karimnagar', 'Jagtial', 'Jagtial Rural');
INSERT INTO public.admin_masterdata_location VALUES (805, 'Telangana', 'Karimnagar', 'Dharmapuri', 'Dharmapuri');
INSERT INTO public.admin_masterdata_location VALUES (806, 'Telangana', 'Karimnagar', 'Dharmapuri', 'Gollapally');
INSERT INTO public.admin_masterdata_location VALUES (807, 'Telangana', 'Karimnagar', 'Dharmapuri', 'Velgatoor');
INSERT INTO public.admin_masterdata_location VALUES (808, 'Telangana', 'Karimnagar', 'Dharmapuri', 'Pegadapally');
INSERT INTO public.admin_masterdata_location VALUES (809, 'Telangana', 'Karimnagar', 'Dharmapuri', 'Buggaram');
INSERT INTO public.admin_masterdata_location VALUES (810, 'Telangana', 'Karimnagar', 'Ramagundam', 'Ramagundam');
INSERT INTO public.admin_masterdata_location VALUES (811, 'Telangana', 'Karimnagar', 'Ramagundam', 'Anthargaon');
INSERT INTO public.admin_masterdata_location VALUES (812, 'Telangana', 'Karimnagar', 'Ramagundam', 'Palakurthy');
INSERT INTO public.admin_masterdata_location VALUES (813, 'Telangana', 'Karimnagar', 'Manthani', 'Manthani');
INSERT INTO public.admin_masterdata_location VALUES (814, 'Telangana', 'Karimnagar', 'Manthani', 'Kamanpur');
INSERT INTO public.admin_masterdata_location VALUES (815, 'Telangana', 'Karimnagar', 'Manthani', 'Kataram');
INSERT INTO public.admin_masterdata_location VALUES (816, 'Telangana', 'Karimnagar', 'Manthani', 'Mahadevpur');
INSERT INTO public.admin_masterdata_location VALUES (817, 'Telangana', 'Karimnagar', 'Manthani', 'Mutharam');
INSERT INTO public.admin_masterdata_location VALUES (818, 'Telangana', 'Karimnagar', 'Manthani', 'Malharrao');
INSERT INTO public.admin_masterdata_location VALUES (819, 'Telangana', 'Karimnagar', 'Manthani', 'Mutharam (Manthani)');
INSERT INTO public.admin_masterdata_location VALUES (820, 'Telangana', 'Karimnagar', 'Manthani', 'Palimela');
INSERT INTO public.admin_masterdata_location VALUES (821, 'Telangana', 'Karimnagar', 'Peddapalle', 'Peddapalle');
INSERT INTO public.admin_masterdata_location VALUES (822, 'Telangana', 'Karimnagar', 'Peddapalle', 'Julapalle');
INSERT INTO public.admin_masterdata_location VALUES (823, 'Telangana', 'Karimnagar', 'Peddapalle', 'Elimedu');
INSERT INTO public.admin_masterdata_location VALUES (824, 'Telangana', 'Karimnagar', 'Peddapalle', 'Sultanabad');
INSERT INTO public.admin_masterdata_location VALUES (825, 'Telangana', 'Karimnagar', 'Peddapalle', 'Odela');
INSERT INTO public.admin_masterdata_location VALUES (826, 'Telangana', 'Karimnagar', 'Peddapalle', 'Kalva Srirampur');
INSERT INTO public.admin_masterdata_location VALUES (827, 'Telangana', 'Karimnagar', 'Karimnagar', 'Karimnagar');
INSERT INTO public.admin_masterdata_location VALUES (828, 'Telangana', 'Karimnagar', 'Karimnagar', 'Kothapally');
INSERT INTO public.admin_masterdata_location VALUES (829, 'Telangana', 'Karimnagar', 'Karimnagar', 'Karimnagar Rural');
INSERT INTO public.admin_masterdata_location VALUES (830, 'Telangana', 'Karimnagar', 'Choppadandi', 'Choppadandi');
INSERT INTO public.admin_masterdata_location VALUES (831, 'Telangana', 'Karimnagar', 'Choppadandi', 'Gangadhara');
INSERT INTO public.admin_masterdata_location VALUES (832, 'Telangana', 'Karimnagar', 'Choppadandi', 'Ramadugu');
INSERT INTO public.admin_masterdata_location VALUES (833, 'Telangana', 'Karimnagar', 'Choppadandi', 'Mallial');
INSERT INTO public.admin_masterdata_location VALUES (834, 'Telangana', 'Karimnagar', 'Choppadandi', 'Kodimial');
INSERT INTO public.admin_masterdata_location VALUES (835, 'Telangana', 'Karimnagar', 'Choppadandi', 'Boinpalle');
INSERT INTO public.admin_masterdata_location VALUES (836, 'Telangana', 'Karimnagar', 'Vemulawada', 'Vemulawada');
INSERT INTO public.admin_masterdata_location VALUES (837, 'Telangana', 'Karimnagar', 'Vemulawada', 'Konaraopeta');
INSERT INTO public.admin_masterdata_location VALUES (838, 'Telangana', 'Karimnagar', 'Vemulawada', 'Chandurthi');
INSERT INTO public.admin_masterdata_location VALUES (839, 'Telangana', 'Karimnagar', 'Vemulawada', 'Medipalli');
INSERT INTO public.admin_masterdata_location VALUES (840, 'Telangana', 'Karimnagar', 'Vemulawada', 'Rudrangi');
INSERT INTO public.admin_masterdata_location VALUES (841, 'Telangana', 'Karimnagar', 'Vemulawada', 'Vemulawada Rural');
INSERT INTO public.admin_masterdata_location VALUES (842, 'Telangana', 'Karimnagar', 'Sircilla', 'Sircilla');
INSERT INTO public.admin_masterdata_location VALUES (843, 'Telangana', 'Karimnagar', 'Sircilla', 'Thangallapalli');
INSERT INTO public.admin_masterdata_location VALUES (844, 'Telangana', 'Karimnagar', 'Sircilla', 'Mustabad');
INSERT INTO public.admin_masterdata_location VALUES (845, 'Telangana', 'Karimnagar', 'Sircilla', 'Yellareddypeta');
INSERT INTO public.admin_masterdata_location VALUES (846, 'Telangana', 'Karimnagar', 'Sircilla', 'Gambhiraopet');
INSERT INTO public.admin_masterdata_location VALUES (847, 'Telangana', 'Karimnagar', 'Sircilla', 'Veernapalli');
INSERT INTO public.admin_masterdata_location VALUES (848, 'Telangana', 'Karimnagar', 'Manakondur', 'Manakondur');
INSERT INTO public.admin_masterdata_location VALUES (849, 'Telangana', 'Karimnagar', 'Manakondur', 'Ellanthakunta');
INSERT INTO public.admin_masterdata_location VALUES (850, 'Telangana', 'Karimnagar', 'Manakondur', 'Bejjanki');
INSERT INTO public.admin_masterdata_location VALUES (851, 'Telangana', 'Karimnagar', 'Manakondur', 'Timmapur');
INSERT INTO public.admin_masterdata_location VALUES (852, 'Telangana', 'Karimnagar', 'Manakondur', 'Shankarapatnam');
INSERT INTO public.admin_masterdata_location VALUES (853, 'Telangana', 'Karimnagar', 'Manakondur', 'Ganneruvaram');
INSERT INTO public.admin_masterdata_location VALUES (854, 'Telangana', 'Karimnagar', 'Huzurabad', 'Huzurabad');
INSERT INTO public.admin_masterdata_location VALUES (855, 'Telangana', 'Karimnagar', 'Huzurabad', 'Kamalapur');
INSERT INTO public.admin_masterdata_location VALUES (856, 'Telangana', 'Karimnagar', 'Huzurabad', 'Veenavanka');
INSERT INTO public.admin_masterdata_location VALUES (857, 'Telangana', 'Karimnagar', 'Huzurabad', 'Jammikunta');
INSERT INTO public.admin_masterdata_location VALUES (858, 'Telangana', 'Karimnagar', 'Huzurabad', 'Illanthakunta');
INSERT INTO public.admin_masterdata_location VALUES (859, 'Telangana', 'Karimnagar', 'Husnabad', 'Husnabad');
INSERT INTO public.admin_masterdata_location VALUES (860, 'Telangana', 'Karimnagar', 'Husnabad', 'Chigurumamidi');
INSERT INTO public.admin_masterdata_location VALUES (861, 'Telangana', 'Karimnagar', 'Husnabad', 'Koheda');
INSERT INTO public.admin_masterdata_location VALUES (862, 'Telangana', 'Karimnagar', 'Husnabad', 'Saidapur');
INSERT INTO public.admin_masterdata_location VALUES (863, 'Telangana', 'Karimnagar', 'Husnabad', 'Bheemadevarpalle');
INSERT INTO public.admin_masterdata_location VALUES (864, 'Telangana', 'Karimnagar', 'Husnabad', 'Elkathurthi');
INSERT INTO public.admin_masterdata_location VALUES (865, 'Telangana', 'Karimnagar', 'Husnabad', 'Akkannapet');
INSERT INTO public.admin_masterdata_location VALUES (866, 'Telangana', 'Medak', 'Siddipet', 'Siddipet Urban');
INSERT INTO public.admin_masterdata_location VALUES (867, 'Telangana', 'Medak', 'Siddipet', 'Siddipet Rural');
INSERT INTO public.admin_masterdata_location VALUES (868, 'Telangana', 'Medak', 'Siddipet', 'Chinnakodur');
INSERT INTO public.admin_masterdata_location VALUES (869, 'Telangana', 'Medak', 'Siddipet', 'Nangnoor');
INSERT INTO public.admin_masterdata_location VALUES (870, 'Telangana', 'Medak', 'Medak', 'Medak');
INSERT INTO public.admin_masterdata_location VALUES (871, 'Telangana', 'Medak', 'Medak', 'Papannapet');
INSERT INTO public.admin_masterdata_location VALUES (872, 'Telangana', 'Medak', 'Medak', 'Ramayampet');
INSERT INTO public.admin_masterdata_location VALUES (873, 'Telangana', 'Medak', 'Medak', 'Shankarampet Small');
INSERT INTO public.admin_masterdata_location VALUES (874, 'Telangana', 'Medak', 'Medak', 'Nizampet');
INSERT INTO public.admin_masterdata_location VALUES (875, 'Telangana', 'Medak', 'Narayankhed', 'Narayankhed');
INSERT INTO public.admin_masterdata_location VALUES (876, 'Telangana', 'Medak', 'Narayankhed', 'Kangti');
INSERT INTO public.admin_masterdata_location VALUES (877, 'Telangana', 'Medak', 'Narayankhed', 'Manoor');
INSERT INTO public.admin_masterdata_location VALUES (878, 'Telangana', 'Medak', 'Narayankhed', 'Kalher');
INSERT INTO public.admin_masterdata_location VALUES (879, 'Telangana', 'Medak', 'Narayankhed', 'Sirgapoor');
INSERT INTO public.admin_masterdata_location VALUES (880, 'Telangana', 'Medak', 'Narayankhed', 'Nagalgidda');
INSERT INTO public.admin_masterdata_location VALUES (881, 'Telangana', 'Medak', 'Andole', 'Andole');
INSERT INTO public.admin_masterdata_location VALUES (882, 'Telangana', 'Medak', 'Andole', 'Alladurg');
INSERT INTO public.admin_masterdata_location VALUES (883, 'Telangana', 'Medak', 'Andole', 'Regode');
INSERT INTO public.admin_masterdata_location VALUES (884, 'Telangana', 'Medak', 'Andole', 'Tekmal');
INSERT INTO public.admin_masterdata_location VALUES (885, 'Telangana', 'Medak', 'Andole', 'Raikode');
INSERT INTO public.admin_masterdata_location VALUES (886, 'Telangana', 'Medak', 'Andole', 'Munipally');
INSERT INTO public.admin_masterdata_location VALUES (887, 'Telangana', 'Medak', 'Andole', 'Pulkal');
INSERT INTO public.admin_masterdata_location VALUES (888, 'Telangana', 'Medak', 'Andole', 'Vatpally');
INSERT INTO public.admin_masterdata_location VALUES (889, 'Telangana', 'Medak', 'Narsapur', 'Narsapur');
INSERT INTO public.admin_masterdata_location VALUES (890, 'Telangana', 'Medak', 'Narsapur', 'Kulcharam');
INSERT INTO public.admin_masterdata_location VALUES (891, 'Telangana', 'Medak', 'Narsapur', 'Yeldurthy');
INSERT INTO public.admin_masterdata_location VALUES (892, 'Telangana', 'Medak', 'Narsapur', 'Shivampet');
INSERT INTO public.admin_masterdata_location VALUES (893, 'Telangana', 'Medak', 'Narsapur', 'Kowdipally');
INSERT INTO public.admin_masterdata_location VALUES (894, 'Telangana', 'Medak', 'Narsapur', 'Chilipched');
INSERT INTO public.admin_masterdata_location VALUES (895, 'Telangana', 'Medak', 'Patancheru', 'Patancheru');
INSERT INTO public.admin_masterdata_location VALUES (896, 'Telangana', 'Medak', 'Patancheru', 'Ameenpur');
INSERT INTO public.admin_masterdata_location VALUES (898, 'Telangana', 'Medak', 'Patancheru', 'Gummadidala');
INSERT INTO public.admin_masterdata_location VALUES (899, 'Telangana', 'Medak', 'Patancheru', 'Ramachandrapuram');
INSERT INTO public.admin_masterdata_location VALUES (900, 'Telangana', 'Medak', 'Sangareddy', 'Sangareddy');
INSERT INTO public.admin_masterdata_location VALUES (901, 'Telangana', 'Medak', 'Sangareddy', 'Kondapur');
INSERT INTO public.admin_masterdata_location VALUES (902, 'Telangana', 'Medak', 'Sangareddy', 'Sadasivpet');
INSERT INTO public.admin_masterdata_location VALUES (903, 'Telangana', 'Medak', 'Sangareddy', 'Kandi');
INSERT INTO public.admin_masterdata_location VALUES (904, 'Telangana', 'Medak', 'Gajwel', 'Gajwel');
INSERT INTO public.admin_masterdata_location VALUES (905, 'Telangana', 'Medak', 'Gajwel', 'Toopran');
INSERT INTO public.admin_masterdata_location VALUES (906, 'Telangana', 'Medak', 'Gajwel', 'Kondapak');
INSERT INTO public.admin_masterdata_location VALUES (907, 'Telangana', 'Medak', 'Gajwel', 'Wargal');
INSERT INTO public.admin_masterdata_location VALUES (908, 'Telangana', 'Medak', 'Gajwel', 'Mulug');
INSERT INTO public.admin_masterdata_location VALUES (909, 'Telangana', 'Medak', 'Gajwel', 'Jagdevpur');
INSERT INTO public.admin_masterdata_location VALUES (910, 'Telangana', 'Medak', 'Gajwel', 'Markook');
INSERT INTO public.admin_masterdata_location VALUES (911, 'Telangana', 'Medak', 'Dubbak', 'Dubbak');
INSERT INTO public.admin_masterdata_location VALUES (912, 'Telangana', 'Medak', 'Dubbak', 'Mirdoddi');
INSERT INTO public.admin_masterdata_location VALUES (913, 'Telangana', 'Medak', 'Dubbak', 'Doultabad');
INSERT INTO public.admin_masterdata_location VALUES (914, 'Telangana', 'Medak', 'Dubbak', 'Chegunta');
INSERT INTO public.admin_masterdata_location VALUES (915, 'Telangana', 'Medak', 'Dubbak', 'Thoguta');
INSERT INTO public.admin_masterdata_location VALUES (916, 'Telangana', 'Medak', 'Dubbak', 'Rayapole');
INSERT INTO public.admin_masterdata_location VALUES (917, 'Telangana', 'Ranga Reddy', 'Quthbullapur', 'Quthbullapur');
INSERT INTO public.admin_masterdata_location VALUES (918, 'Telangana', 'Ranga Reddy', 'Quthbullapur', 'Nizampet');
INSERT INTO public.admin_masterdata_location VALUES (919, 'Telangana', 'Ranga Reddy', 'Quthbullapur', 'Gajularamaram');
INSERT INTO public.admin_masterdata_location VALUES (920, 'Telangana', 'Ranga Reddy', 'Malkajgiri', 'Malkajgiri');
INSERT INTO public.admin_masterdata_location VALUES (921, 'Telangana', 'Ranga Reddy', 'Malkajgiri', 'Alwal');
INSERT INTO public.admin_masterdata_location VALUES (922, 'Telangana', 'Ranga Reddy', 'Uppal', 'Uppal');
INSERT INTO public.admin_masterdata_location VALUES (923, 'Telangana', 'Ranga Reddy', 'Uppal', 'Kapra');
INSERT INTO public.admin_masterdata_location VALUES (924, 'Telangana', 'Ranga Reddy', 'L.B. Nagar', 'L.B. Nagar');
INSERT INTO public.admin_masterdata_location VALUES (925, 'Telangana', 'Ranga Reddy', 'L.B. Nagar', 'Saroornagar');
INSERT INTO public.admin_masterdata_location VALUES (926, 'Telangana', 'Ranga Reddy', 'Maheswaram', 'Maheswaram');
INSERT INTO public.admin_masterdata_location VALUES (927, 'Telangana', 'Ranga Reddy', 'Maheswaram', 'Kandukur');
INSERT INTO public.admin_masterdata_location VALUES (928, 'Telangana', 'Ranga Reddy', 'Maheswaram', 'Tukkuguda');
INSERT INTO public.admin_masterdata_location VALUES (929, 'Telangana', 'Ranga Reddy', 'Rajendranagar', 'Rajendranagar');
INSERT INTO public.admin_masterdata_location VALUES (930, 'Telangana', 'Ranga Reddy', 'Rajendranagar', 'Gandipet');
INSERT INTO public.admin_masterdata_location VALUES (931, 'Telangana', 'Ranga Reddy', 'Rajendranagar', 'Shamshabad');
INSERT INTO public.admin_masterdata_location VALUES (932, 'Telangana', 'Ranga Reddy', 'Serilingampally', 'Serilingampally');
INSERT INTO public.admin_masterdata_location VALUES (933, 'Telangana', 'Ranga Reddy', 'Chevella', 'Chevella');
INSERT INTO public.admin_masterdata_location VALUES (934, 'Telangana', 'Ranga Reddy', 'Chevella', 'Moinabad');
INSERT INTO public.admin_masterdata_location VALUES (935, 'Telangana', 'Ranga Reddy', 'Chevella', 'Shabad');
INSERT INTO public.admin_masterdata_location VALUES (936, 'Telangana', 'Ranga Reddy', 'Chevella', 'Shankarpalle');
INSERT INTO public.admin_masterdata_location VALUES (937, 'Telangana', 'Ranga Reddy', 'Chevella', 'Nawabpet');
INSERT INTO public.admin_masterdata_location VALUES (938, 'Telangana', 'Ranga Reddy', 'Pargi', 'Pargi');
INSERT INTO public.admin_masterdata_location VALUES (939, 'Telangana', 'Ranga Reddy', 'Pargi', 'Doma');
INSERT INTO public.admin_masterdata_location VALUES (940, 'Telangana', 'Ranga Reddy', 'Pargi', 'Kulkacherla');
INSERT INTO public.admin_masterdata_location VALUES (941, 'Telangana', 'Ranga Reddy', 'Pargi', 'Pudur');
INSERT INTO public.admin_masterdata_location VALUES (942, 'Telangana', 'Ranga Reddy', 'Pargi', 'Chowdapur');
INSERT INTO public.admin_masterdata_location VALUES (943, 'Telangana', 'Ranga Reddy', 'Vikarabad', 'Vikarabad');
INSERT INTO public.admin_masterdata_location VALUES (944, 'Telangana', 'Ranga Reddy', 'Vikarabad', 'Marpalle');
INSERT INTO public.admin_masterdata_location VALUES (945, 'Telangana', 'Ranga Reddy', 'Vikarabad', 'Mominpet');
INSERT INTO public.admin_masterdata_location VALUES (946, 'Telangana', 'Ranga Reddy', 'Vikarabad', 'Dharur');
INSERT INTO public.admin_masterdata_location VALUES (947, 'Telangana', 'Ranga Reddy', 'Vikarabad', 'Bantwaram');
INSERT INTO public.admin_masterdata_location VALUES (948, 'Telangana', 'Ranga Reddy', 'Vikarabad', 'Kotepally');
INSERT INTO public.admin_masterdata_location VALUES (949, 'Telangana', 'Ranga Reddy', 'Tandur', 'Tandur');
INSERT INTO public.admin_masterdata_location VALUES (950, 'Telangana', 'Ranga Reddy', 'Tandur', 'Peddemul');
INSERT INTO public.admin_masterdata_location VALUES (951, 'Telangana', 'Ranga Reddy', 'Tandur', 'Basheerabad');
INSERT INTO public.admin_masterdata_location VALUES (952, 'Telangana', 'Ranga Reddy', 'Tandur', 'Yalal');
INSERT INTO public.admin_masterdata_location VALUES (953, 'Telangana', 'Ranga Reddy', 'Ibrahimpatnam', 'Ibrahimpatnam');
INSERT INTO public.admin_masterdata_location VALUES (954, 'Telangana', 'Ranga Reddy', 'Ibrahimpatnam', 'Manchal');
INSERT INTO public.admin_masterdata_location VALUES (955, 'Telangana', 'Ranga Reddy', 'Ibrahimpatnam', 'Yacharam');
INSERT INTO public.admin_masterdata_location VALUES (956, 'Telangana', 'Ranga Reddy', 'Ibrahimpatnam', 'Abdullapurmet');
INSERT INTO public.admin_masterdata_location VALUES (957, 'Telangana', 'Hyderabad', 'Musheerabad', 'Musheerabad');
INSERT INTO public.admin_masterdata_location VALUES (958, 'Telangana', 'Hyderabad', 'Malakpet', 'Malakpet');
INSERT INTO public.admin_masterdata_location VALUES (959, 'Telangana', 'Hyderabad', 'Amberpet', 'Amberpet');
INSERT INTO public.admin_masterdata_location VALUES (960, 'Telangana', 'Hyderabad', 'Khairatabad', 'Khairatabad');
INSERT INTO public.admin_masterdata_location VALUES (961, 'Telangana', 'Hyderabad', 'Jubilee Hills', 'Jubilee Hills');
INSERT INTO public.admin_masterdata_location VALUES (962, 'Telangana', 'Hyderabad', 'Jubilee Hills', 'Shaikpet');
INSERT INTO public.admin_masterdata_location VALUES (963, 'Telangana', 'Hyderabad', 'Sanathnagar', 'Sanathnagar');
INSERT INTO public.admin_masterdata_location VALUES (964, 'Telangana', 'Hyderabad', 'Sanathnagar', 'Ameerpet');
INSERT INTO public.admin_masterdata_location VALUES (965, 'Telangana', 'Hyderabad', 'Nampally', 'Nampally');
INSERT INTO public.admin_masterdata_location VALUES (966, 'Telangana', 'Hyderabad', 'Secunderabad', 'Secunderabad');
INSERT INTO public.admin_masterdata_location VALUES (967, 'Telangana', 'Hyderabad', 'Secunderabad Cantonment', 'Marredpally');
INSERT INTO public.admin_masterdata_location VALUES (968, 'Telangana', 'Hyderabad', 'Secunderabad Cantonment', 'Trimulgherry');
INSERT INTO public.admin_masterdata_location VALUES (969, 'Telangana', 'Hyderabad', 'Karwan', 'Karwan');
INSERT INTO public.admin_masterdata_location VALUES (970, 'Telangana', 'Hyderabad', 'Goshamahal', 'Goshamahal');
INSERT INTO public.admin_masterdata_location VALUES (971, 'Telangana', 'Hyderabad', 'Charminar', 'Charminar');
INSERT INTO public.admin_masterdata_location VALUES (972, 'Telangana', 'Hyderabad', 'Chandrayangutta', 'Chandrayangutta');
INSERT INTO public.admin_masterdata_location VALUES (973, 'Telangana', 'Hyderabad', 'Chandrayangutta', 'Bandlaguda');
INSERT INTO public.admin_masterdata_location VALUES (974, 'Telangana', 'Hyderabad', 'Yakutpura', 'Yakutpura');
INSERT INTO public.admin_masterdata_location VALUES (975, 'Telangana', 'Hyderabad', 'Yakutpura', 'Santoshnagar');
INSERT INTO public.admin_masterdata_location VALUES (976, 'Telangana', 'Hyderabad', 'Yakutpura', 'Rain Bazar');
INSERT INTO public.admin_masterdata_location VALUES (977, 'Telangana', 'Hyderabad', 'Bahadurpura', 'Bahadurpura');
INSERT INTO public.admin_masterdata_location VALUES (978, 'Telangana', 'Mahabubnagar', 'Kodangal', 'Kodangal');
INSERT INTO public.admin_masterdata_location VALUES (979, 'Telangana', 'Mahabubnagar', 'Kodangal', 'Bomraspet');
INSERT INTO public.admin_masterdata_location VALUES (980, 'Telangana', 'Mahabubnagar', 'Kodangal', 'Doulthabad');
INSERT INTO public.admin_masterdata_location VALUES (981, 'Telangana', 'Mahabubnagar', 'Kodangal', 'Kosgi');
INSERT INTO public.admin_masterdata_location VALUES (982, 'Telangana', 'Mahabubnagar', 'Kodangal', 'Maddur');
INSERT INTO public.admin_masterdata_location VALUES (983, 'Telangana', 'Mahabubnagar', 'Narayanpet', 'Narayanpet');
INSERT INTO public.admin_masterdata_location VALUES (984, 'Telangana', 'Mahabubnagar', 'Narayanpet', 'Damaragidda');
INSERT INTO public.admin_masterdata_location VALUES (985, 'Telangana', 'Mahabubnagar', 'Narayanpet', 'Dhanwada');
INSERT INTO public.admin_masterdata_location VALUES (986, 'Telangana', 'Mahabubnagar', 'Narayanpet', 'Utkoor');
INSERT INTO public.admin_masterdata_location VALUES (987, 'Telangana', 'Mahabubnagar', 'Narayanpet', 'Krishna');
INSERT INTO public.admin_masterdata_location VALUES (988, 'Telangana', 'Mahabubnagar', 'Narayanpet', 'Marikal');
INSERT INTO public.admin_masterdata_location VALUES (989, 'Telangana', 'Mahabubnagar', 'Mahbubnagar', 'Mahbubnagar Urban');
INSERT INTO public.admin_masterdata_location VALUES (990, 'Telangana', 'Mahabubnagar', 'Mahbubnagar', 'Mahbubnagar Rural');
INSERT INTO public.admin_masterdata_location VALUES (991, 'Telangana', 'Mahabubnagar', 'Mahbubnagar', 'Hanwada');
INSERT INTO public.admin_masterdata_location VALUES (992, 'Telangana', 'Mahabubnagar', 'Jadcherla', 'Jadcherla');
INSERT INTO public.admin_masterdata_location VALUES (993, 'Telangana', 'Mahabubnagar', 'Jadcherla', 'Nawabpet');
INSERT INTO public.admin_masterdata_location VALUES (994, 'Telangana', 'Mahabubnagar', 'Jadcherla', 'Balanagar');
INSERT INTO public.admin_masterdata_location VALUES (995, 'Telangana', 'Mahabubnagar', 'Jadcherla', 'Midjil');
INSERT INTO public.admin_masterdata_location VALUES (996, 'Telangana', 'Mahabubnagar', 'Devarkadra', 'Devarkadra');
INSERT INTO public.admin_masterdata_location VALUES (997, 'Telangana', 'Mahabubnagar', 'Devarkadra', 'Addakal');
INSERT INTO public.admin_masterdata_location VALUES (998, 'Telangana', 'Mahabubnagar', 'Devarkadra', 'Bhootpur');
INSERT INTO public.admin_masterdata_location VALUES (999, 'Telangana', 'Mahabubnagar', 'Devarkadra', 'Chinnachintakunta');
INSERT INTO public.admin_masterdata_location VALUES (1000, 'Telangana', 'Mahabubnagar', 'Devarkadra', 'Kothakota');
INSERT INTO public.admin_masterdata_location VALUES (1001, 'Telangana', 'Mahabubnagar', 'Devarkadra', 'Madanapur');
INSERT INTO public.admin_masterdata_location VALUES (1002, 'Telangana', 'Mahabubnagar', 'Devarkadra', 'Musapet');
INSERT INTO public.admin_masterdata_location VALUES (1003, 'Telangana', 'Mahabubnagar', 'Makthal', 'Makthal');
INSERT INTO public.admin_masterdata_location VALUES (1004, 'Telangana', 'Mahabubnagar', 'Makthal', 'Maganoor');
INSERT INTO public.admin_masterdata_location VALUES (1005, 'Telangana', 'Mahabubnagar', 'Makthal', 'Atmakur');
INSERT INTO public.admin_masterdata_location VALUES (1006, 'Telangana', 'Mahabubnagar', 'Makthal', 'Narva');
INSERT INTO public.admin_masterdata_location VALUES (1007, 'Telangana', 'Mahabubnagar', 'Makthal', 'Utkoor');
INSERT INTO public.admin_masterdata_location VALUES (1008, 'Telangana', 'Mahabubnagar', 'Makthal', 'Krishna');
INSERT INTO public.admin_masterdata_location VALUES (1009, 'Telangana', 'Mahabubnagar', 'Wanaparthy', 'Wanaparthy');
INSERT INTO public.admin_masterdata_location VALUES (1010, 'Telangana', 'Mahabubnagar', 'Wanaparthy', 'Pebbair');
INSERT INTO public.admin_masterdata_location VALUES (1011, 'Telangana', 'Mahabubnagar', 'Wanaparthy', 'Gopalpeta');
INSERT INTO public.admin_masterdata_location VALUES (1012, 'Telangana', 'Mahabubnagar', 'Wanaparthy', 'Peddamandadi');
INSERT INTO public.admin_masterdata_location VALUES (1013, 'Telangana', 'Mahabubnagar', 'Wanaparthy', 'Ghanpur');
INSERT INTO public.admin_masterdata_location VALUES (1014, 'Telangana', 'Mahabubnagar', 'Wanaparthy', 'Revally');
INSERT INTO public.admin_masterdata_location VALUES (1015, 'Telangana', 'Mahabubnagar', 'Gadwal', 'Gadwal');
INSERT INTO public.admin_masterdata_location VALUES (1016, 'Telangana', 'Mahabubnagar', 'Gadwal', 'Maldakal');
INSERT INTO public.admin_masterdata_location VALUES (1017, 'Telangana', 'Mahabubnagar', 'Gadwal', 'Ghattu');
INSERT INTO public.admin_masterdata_location VALUES (1018, 'Telangana', 'Mahabubnagar', 'Gadwal', 'Dharur');
INSERT INTO public.admin_masterdata_location VALUES (1019, 'Telangana', 'Mahabubnagar', 'Gadwal', 'K.T. Doddi');
INSERT INTO public.admin_masterdata_location VALUES (1020, 'Telangana', 'Mahabubnagar', 'Alampur', 'Alampur');
INSERT INTO public.admin_masterdata_location VALUES (1021, 'Telangana', 'Mahabubnagar', 'Alampur', 'Ieeja');
INSERT INTO public.admin_masterdata_location VALUES (1022, 'Telangana', 'Mahabubnagar', 'Alampur', 'Itikyal');
INSERT INTO public.admin_masterdata_location VALUES (1023, 'Telangana', 'Mahabubnagar', 'Alampur', 'Waddepalle');
INSERT INTO public.admin_masterdata_location VALUES (1024, 'Telangana', 'Mahabubnagar', 'Alampur', 'Manopad');
INSERT INTO public.admin_masterdata_location VALUES (1025, 'Telangana', 'Mahabubnagar', 'Alampur', 'Rajoli');
INSERT INTO public.admin_masterdata_location VALUES (1026, 'Telangana', 'Mahabubnagar', 'Nagarkurnool', 'Nagarkurnool');
INSERT INTO public.admin_masterdata_location VALUES (1027, 'Telangana', 'Mahabubnagar', 'Nagarkurnool', 'Bijinapally');
INSERT INTO public.admin_masterdata_location VALUES (1028, 'Telangana', 'Mahabubnagar', 'Nagarkurnool', 'Tadoor');
INSERT INTO public.admin_masterdata_location VALUES (1029, 'Telangana', 'Mahabubnagar', 'Nagarkurnool', 'Telkapally');
INSERT INTO public.admin_masterdata_location VALUES (1030, 'Telangana', 'Mahabubnagar', 'Nagarkurnool', 'Thimmajipet');
INSERT INTO public.admin_masterdata_location VALUES (1031, 'Telangana', 'Mahabubnagar', 'Achampet', 'Achampet');
INSERT INTO public.admin_masterdata_location VALUES (1032, 'Telangana', 'Mahabubnagar', 'Achampet', 'Uppununthala');
INSERT INTO public.admin_masterdata_location VALUES (1033, 'Telangana', 'Mahabubnagar', 'Achampet', 'Amrabad');
INSERT INTO public.admin_masterdata_location VALUES (1034, 'Telangana', 'Mahabubnagar', 'Achampet', 'Balmoor');
INSERT INTO public.admin_masterdata_location VALUES (1035, 'Telangana', 'Mahabubnagar', 'Achampet', 'Lingal');
INSERT INTO public.admin_masterdata_location VALUES (1036, 'Telangana', 'Mahabubnagar', 'Achampet', 'Vangoor');
INSERT INTO public.admin_masterdata_location VALUES (1037, 'Telangana', 'Mahabubnagar', 'Kalwakurthy', 'Kalwakurthy');
INSERT INTO public.admin_masterdata_location VALUES (1038, 'Telangana', 'Mahabubnagar', 'Kalwakurthy', 'Veldanda');
INSERT INTO public.admin_masterdata_location VALUES (1039, 'Telangana', 'Mahabubnagar', 'Kalwakurthy', 'Talakondapalle');
INSERT INTO public.admin_masterdata_location VALUES (1040, 'Telangana', 'Mahabubnagar', 'Kalwakurthy', 'Amangal');
INSERT INTO public.admin_masterdata_location VALUES (1041, 'Telangana', 'Mahabubnagar', 'Kalwakurthy', 'Madgul');
INSERT INTO public.admin_masterdata_location VALUES (1042, 'Telangana', 'Mahabubnagar', 'Kalwakurthy', 'Charakonda');
INSERT INTO public.admin_masterdata_location VALUES (1043, 'Telangana', 'Mahabubnagar', 'Shadnagar', 'Shadnagar');
INSERT INTO public.admin_masterdata_location VALUES (1044, 'Telangana', 'Mahabubnagar', 'Shadnagar', 'Farooqnagar');
INSERT INTO public.admin_masterdata_location VALUES (1045, 'Telangana', 'Mahabubnagar', 'Shadnagar', 'Kothur');
INSERT INTO public.admin_masterdata_location VALUES (1046, 'Telangana', 'Mahabubnagar', 'Shadnagar', 'Keshampet');
INSERT INTO public.admin_masterdata_location VALUES (1047, 'Telangana', 'Mahabubnagar', 'Shadnagar', 'Kondurg');
INSERT INTO public.admin_masterdata_location VALUES (1048, 'Telangana', 'Mahabubnagar', 'Shadnagar', 'Chaudderpally');
INSERT INTO public.admin_masterdata_location VALUES (1049, 'Telangana', 'Mahabubnagar', 'Kollapur', 'Kollapur');
INSERT INTO public.admin_masterdata_location VALUES (1050, 'Telangana', 'Mahabubnagar', 'Kollapur', 'Kodair');
INSERT INTO public.admin_masterdata_location VALUES (1051, 'Telangana', 'Mahabubnagar', 'Kollapur', 'Pangal');
INSERT INTO public.admin_masterdata_location VALUES (1052, 'Telangana', 'Mahabubnagar', 'Kollapur', 'Veepangandla');
INSERT INTO public.admin_masterdata_location VALUES (1053, 'Telangana', 'Nalgonda', 'Devarakonda', 'Devarakonda');
INSERT INTO public.admin_masterdata_location VALUES (1054, 'Telangana', 'Nalgonda', 'Devarakonda', 'Chintapalle');
INSERT INTO public.admin_masterdata_location VALUES (1055, 'Telangana', 'Nalgonda', 'Devarakonda', 'Gundlapalle');
INSERT INTO public.admin_masterdata_location VALUES (1056, 'Telangana', 'Nalgonda', 'Devarakonda', 'Chandampet');
INSERT INTO public.admin_masterdata_location VALUES (1057, 'Telangana', 'Nalgonda', 'Devarakonda', 'Konda Mallepally');
INSERT INTO public.admin_masterdata_location VALUES (1058, 'Telangana', 'Nalgonda', 'Nagarjuna Sagar', 'Nidamanur');
INSERT INTO public.admin_masterdata_location VALUES (1059, 'Telangana', 'Nalgonda', 'Nagarjuna Sagar', 'Gurrampode');
INSERT INTO public.admin_masterdata_location VALUES (1060, 'Telangana', 'Nalgonda', 'Nagarjuna Sagar', 'Peddavoora');
INSERT INTO public.admin_masterdata_location VALUES (1061, 'Telangana', 'Nalgonda', 'Nagarjuna Sagar', 'Anumula');
INSERT INTO public.admin_masterdata_location VALUES (1062, 'Telangana', 'Nalgonda', 'Nagarjuna Sagar', 'Tripuraram');
INSERT INTO public.admin_masterdata_location VALUES (1063, 'Telangana', 'Nalgonda', 'Nagarjuna Sagar', 'Thirumalagiri Sagar');
INSERT INTO public.admin_masterdata_location VALUES (1064, 'Telangana', 'Nalgonda', 'Miryalaguda', 'Miryalaguda');
INSERT INTO public.admin_masterdata_location VALUES (1065, 'Telangana', 'Nalgonda', 'Miryalaguda', 'Vemulapally');
INSERT INTO public.admin_masterdata_location VALUES (1066, 'Telangana', 'Nalgonda', 'Miryalaguda', 'Dameracherla');
INSERT INTO public.admin_masterdata_location VALUES (1067, 'Telangana', 'Nalgonda', 'Huzurnagar', 'Huzurnagar');
INSERT INTO public.admin_masterdata_location VALUES (1068, 'Telangana', 'Nalgonda', 'Huzurnagar', 'Mattampally');
INSERT INTO public.admin_masterdata_location VALUES (1069, 'Telangana', 'Nalgonda', 'Huzurnagar', 'Mellachervu');
INSERT INTO public.admin_masterdata_location VALUES (1070, 'Telangana', 'Nalgonda', 'Huzurnagar', 'Garidepally');
INSERT INTO public.admin_masterdata_location VALUES (1071, 'Telangana', 'Nalgonda', 'Huzurnagar', 'Chintalapalem');
INSERT INTO public.admin_masterdata_location VALUES (1072, 'Telangana', 'Nalgonda', 'Kodad', 'Kodad');
INSERT INTO public.admin_masterdata_location VALUES (1073, 'Telangana', 'Nalgonda', 'Kodad', 'Mothey');
INSERT INTO public.admin_masterdata_location VALUES (1074, 'Telangana', 'Nalgonda', 'Kodad', 'Nadikuda');
INSERT INTO public.admin_masterdata_location VALUES (1075, 'Telangana', 'Nalgonda', 'Kodad', 'Munagala');
INSERT INTO public.admin_masterdata_location VALUES (1076, 'Telangana', 'Nalgonda', 'Kodad', 'Chilkur');
INSERT INTO public.admin_masterdata_location VALUES (1077, 'Telangana', 'Nalgonda', 'Suryapet', 'Suryapet');
INSERT INTO public.admin_masterdata_location VALUES (1078, 'Telangana', 'Nalgonda', 'Suryapet', 'Chivvemla');
INSERT INTO public.admin_masterdata_location VALUES (1079, 'Telangana', 'Nalgonda', 'Suryapet', 'Penpahad');
INSERT INTO public.admin_masterdata_location VALUES (1080, 'Telangana', 'Nalgonda', 'Suryapet', 'Atmakur (S)');
INSERT INTO public.admin_masterdata_location VALUES (1081, 'Telangana', 'Nalgonda', 'Nalgonda', 'Nalgonda');
INSERT INTO public.admin_masterdata_location VALUES (1082, 'Telangana', 'Nalgonda', 'Nalgonda', 'Thipparthy');
INSERT INTO public.admin_masterdata_location VALUES (1083, 'Telangana', 'Nalgonda', 'Nalgonda', 'Kanagal');
INSERT INTO public.admin_masterdata_location VALUES (1084, 'Telangana', 'Nalgonda', 'Nalgonda', 'Madugulapally');
INSERT INTO public.admin_masterdata_location VALUES (1085, 'Telangana', 'Nalgonda', 'Munugode', 'Munugode');
INSERT INTO public.admin_masterdata_location VALUES (1086, 'Telangana', 'Nalgonda', 'Munugode', 'Chandur');
INSERT INTO public.admin_masterdata_location VALUES (1087, 'Telangana', 'Nalgonda', 'Munugode', 'Marriguda');
INSERT INTO public.admin_masterdata_location VALUES (1088, 'Telangana', 'Nalgonda', 'Munugode', 'Nampally');
INSERT INTO public.admin_masterdata_location VALUES (1089, 'Telangana', 'Nalgonda', 'Munugode', 'Narayanapur');
INSERT INTO public.admin_masterdata_location VALUES (1090, 'Telangana', 'Nalgonda', 'Munugode', 'Choutuppal');
INSERT INTO public.admin_masterdata_location VALUES (1091, 'Telangana', 'Nalgonda', 'Bhongir', 'Bhongir');
INSERT INTO public.admin_masterdata_location VALUES (1092, 'Telangana', 'Nalgonda', 'Bhongir', 'Bibinagar');
INSERT INTO public.admin_masterdata_location VALUES (1093, 'Telangana', 'Nalgonda', 'Bhongir', 'Bhoodan Pochampally');
INSERT INTO public.admin_masterdata_location VALUES (1094, 'Telangana', 'Nalgonda', 'Bhongir', 'Valigonda');
INSERT INTO public.admin_masterdata_location VALUES (1095, 'Telangana', 'Nalgonda', 'Nakrekal', 'Nakrekal');
INSERT INTO public.admin_masterdata_location VALUES (1096, 'Telangana', 'Nalgonda', 'Nakrekal', 'Kethepally');
INSERT INTO public.admin_masterdata_location VALUES (1097, 'Telangana', 'Nalgonda', 'Nakrekal', 'Kattangur');
INSERT INTO public.admin_masterdata_location VALUES (1098, 'Telangana', 'Nalgonda', 'Nakrekal', 'Chityal');
INSERT INTO public.admin_masterdata_location VALUES (1099, 'Telangana', 'Nalgonda', 'Nakrekal', 'Ramannapeta');
INSERT INTO public.admin_masterdata_location VALUES (1100, 'Telangana', 'Nalgonda', 'Nakrekal', 'Narketpally');
INSERT INTO public.admin_masterdata_location VALUES (1101, 'Telangana', 'Nalgonda', 'Thungathurthy', 'Thungathurthy');
INSERT INTO public.admin_masterdata_location VALUES (1102, 'Telangana', 'Nalgonda', 'Thungathurthy', 'Thirumalagiri');
INSERT INTO public.admin_masterdata_location VALUES (1103, 'Telangana', 'Nalgonda', 'Thungathurthy', 'Nuthankal');
INSERT INTO public.admin_masterdata_location VALUES (1104, 'Telangana', 'Nalgonda', 'Thungathurthy', 'Jajireddigudem');
INSERT INTO public.admin_masterdata_location VALUES (1105, 'Telangana', 'Nalgonda', 'Thungathurthy', 'Sali Gouraram');
INSERT INTO public.admin_masterdata_location VALUES (1106, 'Telangana', 'Nalgonda', 'Thungathurthy', 'Mothkur');
INSERT INTO public.admin_masterdata_location VALUES (1107, 'Telangana', 'Nalgonda', 'Thungathurthy', 'Addagudur');
INSERT INTO public.admin_masterdata_location VALUES (1108, 'Telangana', 'Nalgonda', 'Thungathurthy', 'Maddirala');
INSERT INTO public.admin_masterdata_location VALUES (1109, 'Telangana', 'Warangal', 'Palakurthi', 'Palakurthi');
INSERT INTO public.admin_masterdata_location VALUES (1110, 'Telangana', 'Warangal', 'Palakurthi', 'Devaruppula');
INSERT INTO public.admin_masterdata_location VALUES (1111, 'Telangana', 'Warangal', 'Palakurthi', 'Kodakandla');
INSERT INTO public.admin_masterdata_location VALUES (1112, 'Telangana', 'Warangal', 'Palakurthi', 'Raiparthy');
INSERT INTO public.admin_masterdata_location VALUES (1113, 'Telangana', 'Warangal', 'Palakurthi', 'Thorrrur');
INSERT INTO public.admin_masterdata_location VALUES (1114, 'Telangana', 'Warangal', 'Ghanpur (Station)', 'Ghanpur (Station)');
INSERT INTO public.admin_masterdata_location VALUES (1115, 'Telangana', 'Warangal', 'Ghanpur (Station)', 'Dharmasagar');
INSERT INTO public.admin_masterdata_location VALUES (1116, 'Telangana', 'Warangal', 'Ghanpur (Station)', 'Raghunathpalle');
INSERT INTO public.admin_masterdata_location VALUES (1117, 'Telangana', 'Warangal', 'Ghanpur (Station)', 'Zaffergadh');
INSERT INTO public.admin_masterdata_location VALUES (1118, 'Telangana', 'Warangal', 'Ghanpur (Station)', 'Lingala Ghanpur');
INSERT INTO public.admin_masterdata_location VALUES (1119, 'Telangana', 'Warangal', 'Jangaon', 'Jangaon');
INSERT INTO public.admin_masterdata_location VALUES (1120, 'Telangana', 'Warangal', 'Jangaon', 'Cherial');
INSERT INTO public.admin_masterdata_location VALUES (1121, 'Telangana', 'Warangal', 'Jangaon', 'Bachannapet');
INSERT INTO public.admin_masterdata_location VALUES (1122, 'Telangana', 'Warangal', 'Jangaon', 'Narmetta');
INSERT INTO public.admin_masterdata_location VALUES (1123, 'Telangana', 'Warangal', 'Jangaon', 'Maddur');
INSERT INTO public.admin_masterdata_location VALUES (1124, 'Telangana', 'Warangal', 'Wardhannapet', 'Wardhannapet');
INSERT INTO public.admin_masterdata_location VALUES (1125, 'Telangana', 'Warangal', 'Wardhannapet', 'Hanamkonda');
INSERT INTO public.admin_masterdata_location VALUES (1126, 'Telangana', 'Warangal', 'Wardhannapet', 'Parvathagiri');
INSERT INTO public.admin_masterdata_location VALUES (1127, 'Telangana', 'Warangal', 'Wardhannapet', 'Hasanparthy');
INSERT INTO public.admin_masterdata_location VALUES (1128, 'Telangana', 'Warangal', 'Bhupalpalle', 'Bhupalpalle');
INSERT INTO public.admin_masterdata_location VALUES (1129, 'Telangana', 'Warangal', 'Bhupalpalle', 'Ghanpur (Mulug)');
INSERT INTO public.admin_masterdata_location VALUES (1130, 'Telangana', 'Warangal', 'Bhupalpalle', 'Regonda');
INSERT INTO public.admin_masterdata_location VALUES (1131, 'Telangana', 'Warangal', 'Bhupalpalle', 'Mogullapalle');
INSERT INTO public.admin_masterdata_location VALUES (1132, 'Telangana', 'Warangal', 'Bhupalpalle', 'Chityal');
INSERT INTO public.admin_masterdata_location VALUES (1133, 'Telangana', 'Warangal', 'Mulug', 'Mulug');
INSERT INTO public.admin_masterdata_location VALUES (1134, 'Telangana', 'Warangal', 'Mulug', 'Venkatapur');
INSERT INTO public.admin_masterdata_location VALUES (1135, 'Telangana', 'Warangal', 'Mulug', 'Govindaraopet');
INSERT INTO public.admin_masterdata_location VALUES (1136, 'Telangana', 'Warangal', 'Mulug', 'Tadvai');
INSERT INTO public.admin_masterdata_location VALUES (1137, 'Telangana', 'Warangal', 'Mulug', 'Eturnagaram');
INSERT INTO public.admin_masterdata_location VALUES (1138, 'Telangana', 'Warangal', 'Mulug', 'Mangapet');
INSERT INTO public.admin_masterdata_location VALUES (1139, 'Telangana', 'Warangal', 'Mulug', 'S.S. Tadwai');
INSERT INTO public.admin_masterdata_location VALUES (1140, 'Telangana', 'Warangal', 'Dornakal', 'Dornakal');
INSERT INTO public.admin_masterdata_location VALUES (1141, 'Telangana', 'Warangal', 'Dornakal', 'Kuravi');
INSERT INTO public.admin_masterdata_location VALUES (1142, 'Telangana', 'Warangal', 'Dornakal', 'Maripeda');
INSERT INTO public.admin_masterdata_location VALUES (1143, 'Telangana', 'Warangal', 'Dornakal', 'Narsimhulapet');
INSERT INTO public.admin_masterdata_location VALUES (1144, 'Telangana', 'Warangal', 'Mahabubabad', 'Mahabubabad');
INSERT INTO public.admin_masterdata_location VALUES (1145, 'Telangana', 'Warangal', 'Mahabubabad', 'Kesamudram');
INSERT INTO public.admin_masterdata_location VALUES (1146, 'Telangana', 'Warangal', 'Mahabubabad', 'Nellikudur');
INSERT INTO public.admin_masterdata_location VALUES (1147, 'Telangana', 'Warangal', 'Mahabubabad', 'Gudur');
INSERT INTO public.admin_masterdata_location VALUES (1148, 'Telangana', 'Warangal', 'Narsampet', 'Narsampet');
INSERT INTO public.admin_masterdata_location VALUES (1149, 'Telangana', 'Warangal', 'Narsampet', 'Chennaraopet');
INSERT INTO public.admin_masterdata_location VALUES (1150, 'Telangana', 'Warangal', 'Narsampet', 'Duggondi');
INSERT INTO public.admin_masterdata_location VALUES (1151, 'Telangana', 'Warangal', 'Narsampet', 'Nekkonda');
INSERT INTO public.admin_masterdata_location VALUES (1152, 'Telangana', 'Warangal', 'Narsampet', 'Khanapur');
INSERT INTO public.admin_masterdata_location VALUES (1153, 'Telangana', 'Warangal', 'Narsampet', 'Nallabelly');
INSERT INTO public.admin_masterdata_location VALUES (1154, 'Telangana', 'Warangal', 'Parkal', 'Parkal');
INSERT INTO public.admin_masterdata_location VALUES (1155, 'Telangana', 'Warangal', 'Parkal', 'Atmakur');
INSERT INTO public.admin_masterdata_location VALUES (1156, 'Telangana', 'Warangal', 'Parkal', 'Sangam');
INSERT INTO public.admin_masterdata_location VALUES (1157, 'Telangana', 'Warangal', 'Parkal', 'Geesugonda');
INSERT INTO public.admin_masterdata_location VALUES (1158, 'Telangana', 'Warangal', 'Parkal', 'Nadikuda');
INSERT INTO public.admin_masterdata_location VALUES (1159, 'Telangana', 'Warangal', 'Warangal West', 'Warangal (Part)');
INSERT INTO public.admin_masterdata_location VALUES (1160, 'Telangana', 'Warangal', 'Warangal West', 'Hanamkonda (Part)');
INSERT INTO public.admin_masterdata_location VALUES (1161, 'Telangana', 'Warangal', 'Warangal East', 'Warangal (Part)');
INSERT INTO public.admin_masterdata_location VALUES (1162, 'Telangana', 'Khammam', 'Kothagudem', 'Kothagudem');
INSERT INTO public.admin_masterdata_location VALUES (1163, 'Telangana', 'Khammam', 'Kothagudem', 'Palwancha');
INSERT INTO public.admin_masterdata_location VALUES (1164, 'Telangana', 'Khammam', 'Kothagudem', 'Sujatanagar');
INSERT INTO public.admin_masterdata_location VALUES (1165, 'Telangana', 'Khammam', 'Kothagudem', 'Chunchupally');
INSERT INTO public.admin_masterdata_location VALUES (1166, 'Telangana', 'Khammam', 'Aswaraopeta', 'Aswaraopeta');
INSERT INTO public.admin_masterdata_location VALUES (1167, 'Telangana', 'Khammam', 'Aswaraopeta', 'Dammapeta');
INSERT INTO public.admin_masterdata_location VALUES (1168, 'Telangana', 'Khammam', 'Aswaraopeta', 'Mulakalapalle');
INSERT INTO public.admin_masterdata_location VALUES (1169, 'Telangana', 'Khammam', 'Aswaraopeta', 'Chandrugonda');
INSERT INTO public.admin_masterdata_location VALUES (1170, 'Telangana', 'Khammam', 'Bhadrachalam', 'Bhadrachalam');
INSERT INTO public.admin_masterdata_location VALUES (1171, 'Telangana', 'Khammam', 'Bhadrachalam', 'Wazeed');
INSERT INTO public.admin_masterdata_location VALUES (1172, 'Telangana', 'Khammam', 'Bhadrachalam', 'Venkatapuram');
INSERT INTO public.admin_masterdata_location VALUES (1173, 'Telangana', 'Khammam', 'Bhadrachalam', 'Cherla');
INSERT INTO public.admin_masterdata_location VALUES (1174, 'Telangana', 'Khammam', 'Bhadrachalam', 'Dummugudem');
INSERT INTO public.admin_masterdata_location VALUES (1175, 'Telangana', 'Khammam', 'Khammam', 'Khammam Urban');
INSERT INTO public.admin_masterdata_location VALUES (1176, 'Telangana', 'Khammam', 'Khammam', 'Khammam Rural');
INSERT INTO public.admin_masterdata_location VALUES (1177, 'Telangana', 'Khammam', 'Palair', 'Khammam Rural (Part)');
INSERT INTO public.admin_masterdata_location VALUES (1178, 'Telangana', 'Khammam', 'Palair', 'Kusumanchi');
INSERT INTO public.admin_masterdata_location VALUES (1179, 'Telangana', 'Khammam', 'Palair', 'Thirumalayapalem');
INSERT INTO public.admin_masterdata_location VALUES (1180, 'Telangana', 'Khammam', 'Palair', 'Nelakondapalle');
INSERT INTO public.admin_masterdata_location VALUES (1181, 'Telangana', 'Khammam', 'Madhira', 'Madhira');
INSERT INTO public.admin_masterdata_location VALUES (1182, 'Telangana', 'Khammam', 'Madhira', 'Bonakal');
INSERT INTO public.admin_masterdata_location VALUES (1183, 'Telangana', 'Khammam', 'Madhira', 'Chintakani');
INSERT INTO public.admin_masterdata_location VALUES (1184, 'Telangana', 'Khammam', 'Madhira', 'Mudigonda');
INSERT INTO public.admin_masterdata_location VALUES (1185, 'Telangana', 'Khammam', 'Madhira', 'Yerrupalem');
INSERT INTO public.admin_masterdata_location VALUES (1186, 'Telangana', 'Khammam', 'Wyra', 'Wyra');
INSERT INTO public.admin_masterdata_location VALUES (1187, 'Telangana', 'Khammam', 'Wyra', 'Enkoor');
INSERT INTO public.admin_masterdata_location VALUES (1188, 'Telangana', 'Khammam', 'Wyra', 'Konijerla');
INSERT INTO public.admin_masterdata_location VALUES (1189, 'Telangana', 'Khammam', 'Wyra', 'Singareni');
INSERT INTO public.admin_masterdata_location VALUES (1190, 'Telangana', 'Khammam', 'Wyra', 'Julurpad');
INSERT INTO public.admin_masterdata_location VALUES (1191, 'Telangana', 'Khammam', 'Sathupalli', 'Sathupalli');
INSERT INTO public.admin_masterdata_location VALUES (1192, 'Telangana', 'Khammam', 'Sathupalli', 'Penuballi');
INSERT INTO public.admin_masterdata_location VALUES (1193, 'Telangana', 'Khammam', 'Sathupalli', 'Kallur');
INSERT INTO public.admin_masterdata_location VALUES (1194, 'Telangana', 'Khammam', 'Sathupalli', 'Thallada');
INSERT INTO public.admin_masterdata_location VALUES (1195, 'Telangana', 'Khammam', 'Sathupalli', 'Vemsoor');
INSERT INTO public.admin_masterdata_location VALUES (1196, 'Telangana', 'Khammam', 'Yellandu', 'Yellandu');
INSERT INTO public.admin_masterdata_location VALUES (1197, 'Telangana', 'Khammam', 'Yellandu', 'Kamepalle');
INSERT INTO public.admin_masterdata_location VALUES (1198, 'Telangana', 'Khammam', 'Yellandu', 'Bayyaram');
INSERT INTO public.admin_masterdata_location VALUES (1199, 'Telangana', 'Khammam', 'Yellandu', 'Tekulapalle');
INSERT INTO public.admin_masterdata_location VALUES (1200, 'Telangana', 'Khammam', 'Pinapaka', 'Pinapaka');
INSERT INTO public.admin_masterdata_location VALUES (1201, 'Telangana', 'Khammam', 'Pinapaka', 'Manuguru');
INSERT INTO public.admin_masterdata_location VALUES (1202, 'Telangana', 'Khammam', 'Pinapaka', 'Gundala');
INSERT INTO public.admin_masterdata_location VALUES (1203, 'Telangana', 'Khammam', 'Pinapaka', 'Burgampahad');
INSERT INTO public.admin_masterdata_location VALUES (1204, 'Telangana', 'Khammam', 'Pinapaka', 'Aswapuram');
INSERT INTO public.admin_masterdata_location VALUES (1215, 'Kerala', 'N/A', 'N/A', 'N/A');
INSERT INTO public.admin_masterdata_location VALUES (1216, 'Kerala', 'kerala district', 'N/A', 'N/A');
INSERT INTO public.admin_masterdata_location VALUES (1217, 'Kerala', 'kerala district', 'kerala constituency', 'N/A');
INSERT INTO public.admin_masterdata_location VALUES (1218, 'Kerala', 'kerala district', 'kerala constituency', 'kerala mandal');


--
-- Data for Name: ads; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.ads VALUES (5, 'https://ik.imagekit.io/m4x8t3fcwv/ads/ad_1772002874220_RzWjy4pHY.jpg', 'DJI drone..!', 'www.dwaith.com', '2026-02-25', '2026-03-04', 'all', '[{"id": 1772002863206, "name": "uppal", "type": "radius", "radius": 5, "region": "Full Country", "targetingLabel": "5km"}]', '2026-02-25 07:01:15.74005');


--
-- Data for Name: states; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: districts; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: constituencies; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (27, 'banukakalyan', 'banukakalyan@gmail.com', '$2b$10$yVoXmov.KpTiSCw/3LTTrecF3XQtYvwOX9SeLJyLCvYfPPMO5HoMW', 'kalyan chakravarthi', '8179792568', 'data:image/jpeg;base64,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', NULL, 'Telangana', 'Hyderabad', 'Sanathnagar', 'Sanathnagar', 'village', '', true, 'user', '2026-02-27 07:10:58.109294', '2026-02-27 07:12:30.179652', '', '48038636-f152-4929-a12d-a1f93e5a1f81');
INSERT INTO public.users VALUES (8, 'dwaithdev', 'dwaith.dev@gmail.com', '$2b$10$1MAqw30sR.rl42XI8A7c5uflOX7rwc3rWmsA84wpliKMKVETm5xUO', 'Dwaith Dev', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, true, 'admin', '2026-02-24 11:08:02.54012', '2026-02-24 11:08:02.54012', NULL, NULL);
INSERT INTO public.users VALUES (26, 'test1', 'test1@gmail.com', '$2b$10$MWVuzTYEW0drQDu3QzWraeZUA7bYkm0lDJ/TGExPsMovBHDb90zuy', 'Test user 1 ', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, true, 'user', '2026-02-27 07:07:09.37947', '2026-02-27 07:07:37.939003', NULL, '7db3d7fb-ce1d-491d-be1b-86f1a9c89d29');


--
-- Data for Name: feedbacks; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: mandals; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.notifications VALUES (1, 'Test 1', 'Notification test 1', false, NULL, 'sent', NULL, '2026-02-24 13:52:35.752539');


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: villages; Type: TABLE DATA; Schema: public; Owner: -
--



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
-- PostgreSQL database dump complete
--

\unrestrict I2CQ2cY9kfPCqwisDNmQZpAtgen2bqXQcPScnSLiwAYYRKFss7z7Reopgou0WgH

