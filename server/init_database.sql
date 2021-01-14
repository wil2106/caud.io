--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5 (Ubuntu 12.5-1.pgdg16.04+1)
-- Dumped by pg_dump version 12.3

-- Started on 2021-01-14 16:29:11

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
-- TOC entry 3879 (class 1262 OID 3213509)
-- Name: dcl9g0mue0ldih; Type: DATABASE; Schema: -; Owner: ysgsygztyuphfi
--

CREATE DATABASE dcl9g0mue0ldih WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8';


ALTER DATABASE dcl9g0mue0ldih OWNER TO ysgsygztyuphfi;

\connect dcl9g0mue0ldih

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
-- TOC entry 208 (class 1259 OID 10953923)
-- Name: libraries; Type: TABLE; Schema: public; Owner: ysgsygztyuphfi
--

CREATE TABLE public.libraries (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "musicId" integer NOT NULL,
    "sampleId" integer NOT NULL
);


ALTER TABLE public.libraries OWNER TO ysgsygztyuphfi;

--
-- TOC entry 205 (class 1259 OID 10953898)
-- Name: music; Type: TABLE; Schema: public; Owner: ysgsygztyuphfi
--

CREATE TABLE public.music (
    id integer NOT NULL,
    title character varying(255),
    nb_likes integer,
    nb_forks integer,
    nb_listen integer,
    setup_code text,
    step_code text,
    bpm integer,
    nb_steps integer,
    can_fork boolean,
    private boolean,
    image bytea,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    fk_author integer
);


ALTER TABLE public.music OWNER TO ysgsygztyuphfi;

--
-- TOC entry 204 (class 1259 OID 10953896)
-- Name: music_id_seq; Type: SEQUENCE; Schema: public; Owner: ysgsygztyuphfi
--

CREATE SEQUENCE public.music_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.music_id_seq OWNER TO ysgsygztyuphfi;

--
-- TOC entry 3883 (class 0 OID 0)
-- Dependencies: 204
-- Name: music_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ysgsygztyuphfi
--

ALTER SEQUENCE public.music_id_seq OWNED BY public.music.id;


--
-- TOC entry 210 (class 1259 OID 10953940)
-- Name: notifications; Type: TABLE; Schema: public; Owner: ysgsygztyuphfi
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    action character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    fk_user integer,
    fk_emitter integer,
    fk_music integer
);


ALTER TABLE public.notifications OWNER TO ysgsygztyuphfi;

--
-- TOC entry 209 (class 1259 OID 10953938)
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: ysgsygztyuphfi
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notifications_id_seq OWNER TO ysgsygztyuphfi;

--
-- TOC entry 3884 (class 0 OID 0)
-- Dependencies: 209
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ysgsygztyuphfi
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- TOC entry 207 (class 1259 OID 10953914)
-- Name: samples; Type: TABLE; Schema: public; Owner: ysgsygztyuphfi
--

CREATE TABLE public.samples (
    id integer NOT NULL,
    title character varying(255),
    file bytea,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.samples OWNER TO ysgsygztyuphfi;

--
-- TOC entry 206 (class 1259 OID 10953912)
-- Name: samples_id_seq; Type: SEQUENCE; Schema: public; Owner: ysgsygztyuphfi
--

CREATE SEQUENCE public.samples_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.samples_id_seq OWNER TO ysgsygztyuphfi;

--
-- TOC entry 3885 (class 0 OID 0)
-- Dependencies: 206
-- Name: samples_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ysgsygztyuphfi
--

ALTER SEQUENCE public.samples_id_seq OWNED BY public.samples.id;


--
-- TOC entry 203 (class 1259 OID 10953887)
-- Name: users; Type: TABLE; Schema: public; Owner: ysgsygztyuphfi
--

CREATE TABLE public.users (
    id integer NOT NULL,
    login character varying(255),
    password character varying(255),
    description character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO ysgsygztyuphfi;

--
-- TOC entry 202 (class 1259 OID 10953885)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: ysgsygztyuphfi
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO ysgsygztyuphfi;

--
-- TOC entry 3886 (class 0 OID 0)
-- Dependencies: 202
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: ysgsygztyuphfi
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3729 (class 2604 OID 10953901)
-- Name: music id; Type: DEFAULT; Schema: public; Owner: ysgsygztyuphfi
--

ALTER TABLE ONLY public.music ALTER COLUMN id SET DEFAULT nextval('public.music_id_seq'::regclass);


--
-- TOC entry 3731 (class 2604 OID 10953943)
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: ysgsygztyuphfi
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- TOC entry 3730 (class 2604 OID 10953917)
-- Name: samples id; Type: DEFAULT; Schema: public; Owner: ysgsygztyuphfi
--

ALTER TABLE ONLY public.samples ALTER COLUMN id SET DEFAULT nextval('public.samples_id_seq'::regclass);


--
-- TOC entry 3728 (class 2604 OID 10953890)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: ysgsygztyuphfi
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3739 (class 2606 OID 10953927)
-- Name: libraries libraries_pkey; Type: CONSTRAINT; Schema: public; Owner: ysgsygztyuphfi
--

ALTER TABLE ONLY public.libraries
    ADD CONSTRAINT libraries_pkey PRIMARY KEY ("musicId", "sampleId");


--
-- TOC entry 3735 (class 2606 OID 10953906)
-- Name: music music_pkey; Type: CONSTRAINT; Schema: public; Owner: ysgsygztyuphfi
--

ALTER TABLE ONLY public.music
    ADD CONSTRAINT music_pkey PRIMARY KEY (id);


--
-- TOC entry 3741 (class 2606 OID 10953945)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: ysgsygztyuphfi
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- TOC entry 3737 (class 2606 OID 10953922)
-- Name: samples samples_pkey; Type: CONSTRAINT; Schema: public; Owner: ysgsygztyuphfi
--

ALTER TABLE ONLY public.samples
    ADD CONSTRAINT samples_pkey PRIMARY KEY (id);


--
-- TOC entry 3733 (class 2606 OID 10953895)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: ysgsygztyuphfi
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3743 (class 2606 OID 10953928)
-- Name: libraries libraries_musicId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ysgsygztyuphfi
--

ALTER TABLE ONLY public.libraries
    ADD CONSTRAINT "libraries_musicId_fkey" FOREIGN KEY ("musicId") REFERENCES public.music(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3744 (class 2606 OID 10953933)
-- Name: libraries libraries_sampleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ysgsygztyuphfi
--

ALTER TABLE ONLY public.libraries
    ADD CONSTRAINT "libraries_sampleId_fkey" FOREIGN KEY ("sampleId") REFERENCES public.samples(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3742 (class 2606 OID 10953907)
-- Name: music music_fk_author_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ysgsygztyuphfi
--

ALTER TABLE ONLY public.music
    ADD CONSTRAINT music_fk_author_fkey FOREIGN KEY (fk_author) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3746 (class 2606 OID 10953951)
-- Name: notifications notifications_fk_emitter_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ysgsygztyuphfi
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_fk_emitter_fkey FOREIGN KEY (fk_emitter) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3747 (class 2606 OID 10953956)
-- Name: notifications notifications_fk_music_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ysgsygztyuphfi
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_fk_music_fkey FOREIGN KEY (fk_music) REFERENCES public.music(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3745 (class 2606 OID 10953946)
-- Name: notifications notifications_fk_user_fkey; Type: FK CONSTRAINT; Schema: public; Owner: ysgsygztyuphfi
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_fk_user_fkey FOREIGN KEY (fk_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3880 (class 0 OID 0)
-- Dependencies: 3879
-- Name: DATABASE dcl9g0mue0ldih; Type: ACL; Schema: -; Owner: ysgsygztyuphfi
--

REVOKE CONNECT,TEMPORARY ON DATABASE dcl9g0mue0ldih FROM PUBLIC;


--
-- TOC entry 3881 (class 0 OID 0)
-- Dependencies: 3
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: ysgsygztyuphfi
--

REVOKE ALL ON SCHEMA public FROM postgres;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO ysgsygztyuphfi;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- TOC entry 3882 (class 0 OID 0)
-- Dependencies: 651
-- Name: LANGUAGE plpgsql; Type: ACL; Schema: -; Owner: postgres
--

GRANT ALL ON LANGUAGE plpgsql TO ysgsygztyuphfi;


-- Completed on 2021-01-14 16:29:17

--
-- PostgreSQL database dump complete
--

