--
-- PostgreSQL database dump
--

\restrict HwEVFmgk5lpQaobkDthKNqwfTJy8CedIjaN2hSxxYxOPT7SqxQRe3WTMYkwnxqN

-- Dumped from database version 16.13
-- Dumped by pg_dump version 16.13

-- Started on 2026-03-29 22:52:49

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

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 16454)
-- Name: article_topics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.article_topics (
    article_id integer NOT NULL,
    topic_id integer NOT NULL
);


--
-- TOC entry 231 (class 1259 OID 16579)
-- Name: article_views; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.article_views (
    user_id integer NOT NULL,
    article_id integer NOT NULL,
    viewed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 229 (class 1259 OID 16539)
-- Name: article_votes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.article_votes (
    user_id integer NOT NULL,
    article_id integer NOT NULL,
    vote_type character varying(20) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 220 (class 1259 OID 16435)
-- Name: articles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.articles (
    id integer NOT NULL,
    author_id integer NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255),
    summary text,
    status character varying(50),
    content text,
    thumbnail character varying(255),
    current_edit_id integer,
    view_count integer DEFAULT 0,
    like_count integer DEFAULT 0,
    dislike_count integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone
);


--
-- TOC entry 219 (class 1259 OID 16434)
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4961 (class 0 OID 0)
-- Dependencies: 219
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- TOC entry 228 (class 1259 OID 16524)
-- Name: comments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.comments (
    id integer NOT NULL,
    content text NOT NULL,
    user_id integer NOT NULL,
    commentable_id integer NOT NULL,
    commentable_type character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 227 (class 1259 OID 16523)
-- Name: comments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.comments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4962 (class 0 OID 0)
-- Dependencies: 227
-- Name: comments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.comments_id_seq OWNED BY public.comments.id;


--
-- TOC entry 226 (class 1259 OID 16507)
-- Name: edits; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.edits (
    id integer NOT NULL,
    editor_id integer NOT NULL,
    editable_id integer NOT NULL,
    editable_type character varying(50) NOT NULL,
    title character varying(255),
    summary text,
    content text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    upvote_count integer DEFAULT 0,
    downvote_count integer DEFAULT 0,
    status character varying(50),
    thumbnail character varying(255),
    reviewed_at timestamp without time zone,
    reviewed_by integer
);


--
-- TOC entry 225 (class 1259 OID 16506)
-- Name: edits_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.edits_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4963 (class 0 OID 0)
-- Dependencies: 225
-- Name: edits_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.edits_id_seq OWNED BY public.edits.id;


--
-- TOC entry 230 (class 1259 OID 16559)
-- Name: edits_votes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.edits_votes (
    user_id integer NOT NULL,
    edit_id integer NOT NULL,
    vote_type character varying(20) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- TOC entry 237 (class 1259 OID 16644)
-- Name: event_articles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_articles (
    event_id integer NOT NULL,
    article_id integer NOT NULL
);


--
-- TOC entry 224 (class 1259 OID 16491)
-- Name: event_topics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.event_topics (
    event_id integer NOT NULL,
    topic_id integer NOT NULL
);


--
-- TOC entry 223 (class 1259 OID 16470)
-- Name: historical_events; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.historical_events (
    id integer NOT NULL,
    creator_id integer NOT NULL,
    title character varying(255) NOT NULL,
    slug character varying(255),
    summary text,
    event_year integer,
    event_date date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    reviewed_at timestamp without time zone,
    reviewed_by integer,
    current_edit_id integer
);


--
-- TOC entry 222 (class 1259 OID 16469)
-- Name: historical_events_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.historical_events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4964 (class 0 OID 0)
-- Dependencies: 222
-- Name: historical_events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.historical_events_id_seq OWNED BY public.historical_events.id;


--
-- TOC entry 233 (class 1259 OID 16597)
-- Name: media; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.media (
    id integer NOT NULL,
    user_id integer NOT NULL,
    url character varying(500) NOT NULL,
    mediable_id integer,
    mediable_type character varying(50)
);


--
-- TOC entry 232 (class 1259 OID 16596)
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.media_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4965 (class 0 OID 0)
-- Dependencies: 232
-- Name: media_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.media_id_seq OWNED BY public.media.id;


--
-- TOC entry 235 (class 1259 OID 16613)
-- Name: notifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    user_id integer NOT NULL,
    message text,
    related_id integer,
    related_type character varying(50),
    is_read boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    actor_id integer,
    title character varying(255)
);


--
-- TOC entry 234 (class 1259 OID 16612)
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
-- TOC entry 4966 (class 0 OID 0)
-- Dependencies: 234
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- TOC entry 236 (class 1259 OID 16628)
-- Name: topic_moderators; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.topic_moderators (
    user_id integer NOT NULL,
    topic_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    promoted_by integer
);


--
-- TOC entry 218 (class 1259 OID 16424)
-- Name: topics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.topics (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    slug character varying(255),
    description text,
    type character varying(50)
);


--
-- TOC entry 217 (class 1259 OID 16423)
-- Name: topics_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.topics_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 4967 (class 0 OID 0)
-- Dependencies: 217
-- Name: topics_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.topics_id_seq OWNED BY public.topics.id;


--
-- TOC entry 216 (class 1259 OID 16408)
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    is_admin boolean DEFAULT false,
    avatar character varying(255),
    bio text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    view_count integer DEFAULT 0,
    like_count integer DEFAULT 0,
    dislike_count integer DEFAULT 0
);


--
-- TOC entry 215 (class 1259 OID 16407)
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
-- TOC entry 4968 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4704 (class 2604 OID 16438)
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- TOC entry 4715 (class 2604 OID 16527)
-- Name: comments id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments ALTER COLUMN id SET DEFAULT nextval('public.comments_id_seq'::regclass);


--
-- TOC entry 4711 (class 2604 OID 16510)
-- Name: edits id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.edits ALTER COLUMN id SET DEFAULT nextval('public.edits_id_seq'::regclass);


--
-- TOC entry 4709 (class 2604 OID 16473)
-- Name: historical_events id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_events ALTER COLUMN id SET DEFAULT nextval('public.historical_events_id_seq'::regclass);


--
-- TOC entry 4720 (class 2604 OID 16600)
-- Name: media id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media ALTER COLUMN id SET DEFAULT nextval('public.media_id_seq'::regclass);


--
-- TOC entry 4721 (class 2604 OID 16616)
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- TOC entry 4703 (class 2604 OID 16427)
-- Name: topics id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.topics ALTER COLUMN id SET DEFAULT nextval('public.topics_id_seq'::regclass);


--
-- TOC entry 4697 (class 2604 OID 16411)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4738 (class 2606 OID 16458)
-- Name: article_topics article_topics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_topics
    ADD CONSTRAINT article_topics_pkey PRIMARY KEY (article_id, topic_id);


--
-- TOC entry 4758 (class 2606 OID 16674)
-- Name: article_views article_views_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_views
    ADD CONSTRAINT article_views_pkey PRIMARY KEY (user_id, article_id);


--
-- TOC entry 4750 (class 2606 OID 16670)
-- Name: article_votes article_votes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_votes
    ADD CONSTRAINT article_votes_pkey PRIMARY KEY (user_id, article_id);


--
-- TOC entry 4734 (class 2606 OID 16446)
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- TOC entry 4736 (class 2606 OID 16448)
-- Name: articles articles_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_slug_key UNIQUE (slug);


--
-- TOC entry 4748 (class 2606 OID 16532)
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- TOC entry 4746 (class 2606 OID 16517)
-- Name: edits edits_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.edits
    ADD CONSTRAINT edits_pkey PRIMARY KEY (id);


--
-- TOC entry 4754 (class 2606 OID 16672)
-- Name: edits_votes edits_votes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.edits_votes
    ADD CONSTRAINT edits_votes_pkey PRIMARY KEY (user_id, edit_id);


--
-- TOC entry 4766 (class 2606 OID 16648)
-- Name: event_articles event_articles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_articles
    ADD CONSTRAINT event_articles_pkey PRIMARY KEY (event_id, article_id);


--
-- TOC entry 4744 (class 2606 OID 16495)
-- Name: event_topics event_topics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_topics
    ADD CONSTRAINT event_topics_pkey PRIMARY KEY (event_id, topic_id);


--
-- TOC entry 4740 (class 2606 OID 16478)
-- Name: historical_events historical_events_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_events
    ADD CONSTRAINT historical_events_pkey PRIMARY KEY (id);


--
-- TOC entry 4742 (class 2606 OID 16480)
-- Name: historical_events historical_events_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_events
    ADD CONSTRAINT historical_events_slug_key UNIQUE (slug);


--
-- TOC entry 4760 (class 2606 OID 16605)
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- TOC entry 4762 (class 2606 OID 16622)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- TOC entry 4764 (class 2606 OID 16633)
-- Name: topic_moderators topic_moderators_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.topic_moderators
    ADD CONSTRAINT topic_moderators_pkey PRIMARY KEY (user_id, topic_id);


--
-- TOC entry 4730 (class 2606 OID 16431)
-- Name: topics topics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_pkey PRIMARY KEY (id);


--
-- TOC entry 4732 (class 2606 OID 16433)
-- Name: topics topics_slug_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.topics
    ADD CONSTRAINT topics_slug_key UNIQUE (slug);


--
-- TOC entry 4752 (class 2606 OID 16547)
-- Name: article_votes unique_user_article_vote; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_votes
    ADD CONSTRAINT unique_user_article_vote UNIQUE (user_id, article_id);


--
-- TOC entry 4756 (class 2606 OID 16567)
-- Name: edits_votes unique_user_edit_vote; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.edits_votes
    ADD CONSTRAINT unique_user_edit_vote UNIQUE (user_id, edit_id);


--
-- TOC entry 4726 (class 2606 OID 16422)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4728 (class 2606 OID 16420)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4768 (class 2606 OID 16459)
-- Name: article_topics fk_article_topics_article; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_topics
    ADD CONSTRAINT fk_article_topics_article FOREIGN KEY (article_id) REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- TOC entry 4769 (class 2606 OID 16464)
-- Name: article_topics fk_article_topics_topic; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_topics
    ADD CONSTRAINT fk_article_topics_topic FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE;


--
-- TOC entry 4781 (class 2606 OID 16591)
-- Name: article_views fk_article_views_article; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_views
    ADD CONSTRAINT fk_article_views_article FOREIGN KEY (article_id) REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- TOC entry 4782 (class 2606 OID 16586)
-- Name: article_views fk_article_views_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_views
    ADD CONSTRAINT fk_article_views_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- TOC entry 4777 (class 2606 OID 16553)
-- Name: article_votes fk_article_votes_article; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_votes
    ADD CONSTRAINT fk_article_votes_article FOREIGN KEY (article_id) REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- TOC entry 4778 (class 2606 OID 16548)
-- Name: article_votes fk_article_votes_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.article_votes
    ADD CONSTRAINT fk_article_votes_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4767 (class 2606 OID 16449)
-- Name: articles fk_articles_author; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT fk_articles_author FOREIGN KEY (author_id) REFERENCES public.users(id);


--
-- TOC entry 4776 (class 2606 OID 16533)
-- Name: comments fk_comments_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fk_comments_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4774 (class 2606 OID 16518)
-- Name: edits fk_edits_editor; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.edits
    ADD CONSTRAINT fk_edits_editor FOREIGN KEY (editor_id) REFERENCES public.users(id);


--
-- TOC entry 4775 (class 2606 OID 16659)
-- Name: edits fk_edits_reviewer; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.edits
    ADD CONSTRAINT fk_edits_reviewer FOREIGN KEY (reviewed_by) REFERENCES public.users(id);


--
-- TOC entry 4779 (class 2606 OID 16573)
-- Name: edits_votes fk_edits_votes_edit; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.edits_votes
    ADD CONSTRAINT fk_edits_votes_edit FOREIGN KEY (edit_id) REFERENCES public.edits(id) ON DELETE CASCADE;


--
-- TOC entry 4780 (class 2606 OID 16568)
-- Name: edits_votes fk_edits_votes_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.edits_votes
    ADD CONSTRAINT fk_edits_votes_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4788 (class 2606 OID 16654)
-- Name: event_articles fk_event_articles_article; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_articles
    ADD CONSTRAINT fk_event_articles_article FOREIGN KEY (article_id) REFERENCES public.articles(id) ON DELETE CASCADE;


--
-- TOC entry 4789 (class 2606 OID 16649)
-- Name: event_articles fk_event_articles_event; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_articles
    ADD CONSTRAINT fk_event_articles_event FOREIGN KEY (event_id) REFERENCES public.historical_events(id) ON DELETE CASCADE;


--
-- TOC entry 4772 (class 2606 OID 16496)
-- Name: event_topics fk_event_topics_event; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_topics
    ADD CONSTRAINT fk_event_topics_event FOREIGN KEY (event_id) REFERENCES public.historical_events(id) ON DELETE CASCADE;


--
-- TOC entry 4773 (class 2606 OID 16501)
-- Name: event_topics fk_event_topics_topic; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.event_topics
    ADD CONSTRAINT fk_event_topics_topic FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE;


--
-- TOC entry 4770 (class 2606 OID 16481)
-- Name: historical_events fk_events_creator; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_events
    ADD CONSTRAINT fk_events_creator FOREIGN KEY (creator_id) REFERENCES public.users(id);


--
-- TOC entry 4771 (class 2606 OID 16486)
-- Name: historical_events fk_events_reviewer; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.historical_events
    ADD CONSTRAINT fk_events_reviewer FOREIGN KEY (reviewed_by) REFERENCES public.users(id);


--
-- TOC entry 4783 (class 2606 OID 16606)
-- Name: media fk_media_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT fk_media_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4784 (class 2606 OID 16623)
-- Name: notifications fk_notifications_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT fk_notifications_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4785 (class 2606 OID 16664)
-- Name: topic_moderators fk_topic_moderators_promoter; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.topic_moderators
    ADD CONSTRAINT fk_topic_moderators_promoter FOREIGN KEY (promoted_by) REFERENCES public.users(id);


--
-- TOC entry 4786 (class 2606 OID 16639)
-- Name: topic_moderators fk_topic_moderators_topic; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.topic_moderators
    ADD CONSTRAINT fk_topic_moderators_topic FOREIGN KEY (topic_id) REFERENCES public.topics(id) ON DELETE CASCADE;


--
-- TOC entry 4787 (class 2606 OID 16634)
-- Name: topic_moderators fk_topic_moderators_user; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.topic_moderators
    ADD CONSTRAINT fk_topic_moderators_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


-- Completed on 2026-03-29 22:52:49

--
-- PostgreSQL database dump complete
--

\unrestrict HwEVFmgk5lpQaobkDthKNqwfTJy8CedIjaN2hSxxYxOPT7SqxQRe3WTMYkwnxqN

