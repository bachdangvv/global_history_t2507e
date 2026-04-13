-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 06, 2026 at 02:38 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `global_history`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `id` bigint(20) NOT NULL,
  `author_id` bigint(20) DEFAULT NULL,
  `category_id` bigint(20) DEFAULT NULL,
  `current_edit_id` bigint(20) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(300) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `country` varchar(80) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `tag_ids` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tag_ids`)),
  `view_count` int(11) DEFAULT 0,
  `like_count` int(11) DEFAULT 0,
  `dislike_count` int(11) DEFAULT 0,
  `comment_count` int(11) DEFAULT 0,
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`id`, `author_id`, `category_id`, `current_edit_id`, `title`, `slug`, `summary`, `content`, `image_url`, `country`, `status`, `tag_ids`, `view_count`, `like_count`, `dislike_count`, `comment_count`, `published_at`, `created_at`, `updated_at`) VALUES
(1, 1, 1, NULL, 'Amazonian Civilization and History', 'amazonian-civilization-and-history', 'Exploring the ancient civilizations of the Amazon basin and their lasting legacy.', '## Overview\r\nThe Amazonian civilizations represent some of the most sophisticated pre-Columbian societies in South America. These advanced cultures developed complex social structures, innovative agricultural techniques, and extensive trade networks throughout the Amazon Basin.\r\n\r\n## Early Settlement (3000 BCE - 500 CE)\r\nArchaeological evidence suggests the Amazon was first populated around 9,000 years ago. Early inhabitants were hunter-gatherers who adapted to the diverse environments of the rainforest. Over time, these communities developed semi-sedentary settlements and began cultivating crops like manioc, maize, and squash.\r\n\r\nThe earliest evidence of pottery in the Amazon comes from sites along the Marañón and Amazon Rivers, dating back approximately 8,000 years. These early ceramics show remarkable craftsmanship and suggest well-established communities.\r\n\r\n## Development of Agricultural States (500 CE - 1500 CE)\r\nBy 500 CE, complex chiefdoms had emerged in the Amazon. These societies developed sophisticated agricultural systems including:\r\n\r\n- **Terra Preta (Amazonian Dark Earth)**: A form of agricultural soil created through a mixture of biochar, bone, and organic matter. This technique dramatically increased soil fertility and allowed for denser populations.\r\n- **Raised Fields and Mounds**: Engineering projects that prevented flooding and optimized agricultural production\r\n- **Forest Gardens**: Managed forests that combined food production with natural rainforest conditions\r\n\r\n## Population and Settlement\r\nArchaeological surveys using LiDAR technology have revealed that the pre-Columbian Amazon supported populations far larger than previously believed. Population estimates suggest millions of inhabitants across the basin, organized into hundreds of chiefdoms and regional states.\r\n\r\nMajor settlement areas included:\r\n- The floodplains of the Amazon and its tributaries\r\n- The terra firme (upland areas)\r\n- Regions around the mouths of major rivers\r\n\r\n## Culture and Society\r\nAmazonian societies developed complex hierarchies with:\r\n- **Religious Leadership**: Shamans and spiritual leaders held significant authority\r\n- **Trade Networks**: Extensive exchange systems connected distant communities\r\n- **Artistic Traditions**: Production of intricate ceramics, stone tools, and textiles\r\n- **Astronomical Knowledge**: Evidence suggests advanced understanding of celestial phenomena\r\n\r\n## Language and Communication\r\nLinguistic studies indicate the presence of at least 1,400 indigenous language families in the pre-Columbian Amazon. These diverse languages facilitated complex trade relationships and cultural exchanges.\r\n\r\n## Decline and Legacy\r\nThe arrival of Europeans in the 16th century brought devastating consequences through:\r\n- Introduction of diseases to which indigenous populations had no immunity\r\n- Disruption of trade networks\r\n- Military conquest and colonization\r\n- Environmental changes affecting traditional food sources\r\n\r\nFrom an estimated 5-10 million inhabitants in 1492, the Amazonian native population declined by approximately 95% within the first century of contact.\r\n\r\n## Modern Understanding\r\nRecent archaeological discoveries have revolutionized our understanding of Amazonian civilizations:\r\n- LiDAR surveys reveal previously unknown cities and settlements\r\n- Geochemical analysis confirms extensive agricultural management\r\n- DNA studies show migration patterns and genetic diversity\r\n- Ethnographic research with modern indigenous communities preserves traditional knowledge\r\n\r\n## Conclusion\r\nThe Amazonian civilizations represent a remarkable achievement in human adaptation and development. These societies successfully supported large populations in a challenging environment through ingenuity, innovation, and sophisticated understanding of their ecosystem. Their legacy continues through the indigenous peoples who inhabit the Amazon today.', 'https://tse1.mm.bing.net/th/id/OIP.ZxHcLDpjtDPRoH0kA8oBSwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', 'Brazil', 'published', NULL, 267, 18, 2, 3, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-06 12:08:57'),
(2, 1, 2, NULL, 'Ancient Egyptian Architecture', 'ancient-egyptian-architecture', 'The monumental building traditions of ancient Egypt spanning three millennia.', '## Overview\r\nAncient Egyptian architecture represents one of the most enduring and impressive architectural traditions in human history. Built to last for eternity, Egyptian structures demonstrate remarkable engineering skill, mathematical precision, and artistic vision.\r\n\r\n## Periods of Egyptian Architecture\r\n\r\n### Early Dynastic Period (3100-2686 BCE)\r\nArchitecture during this period established the fundamental forms that would be refined throughout Egyptian history. Structures were primarily functional, made of mud brick for most buildings.\r\n\r\n### Old Kingdom (2686-2181 BCE)\r\nThe pyramid age marked the pinnacle of monumental construction, particularly during the reign of Khufu (c. 2589-2566 BCE).\r\n\r\n### Middle Kingdom (2055-1650 BCE)\r\nThis period saw refinement of architectural styles, though fewer monumental structures were built. Focus shifted to practical administration and military architecture.\r\n\r\n### New Kingdom (1550-1069 BCE)\r\nThe largest temples were constructed during this period, representing the height of Egyptian architectural achievement.\r\n\r\n## Major Architectural Forms\r\n\r\n### The Pyramids\r\nThe pyramids represent humanity\'s most ambitious building projects. The Great Pyramid of Khufu:\r\n- Height: Originally 146.5 meters (481 feet)\r\n- Base: 230.4 meters (756 feet) on each side\r\n- Contains approximately 2.3 million stone blocks\r\n- Construction period: Approximately 20 years\r\n- Workforce: Estimated 20,000-30,000 workers\r\n\r\n### Temples\r\nEgyptian temples served as centers of religious and economic power. They typically included:\r\n- **Pylon gates**: Monumental entrance structures\r\n- **Hypostyle halls**: Halls filled with columns supporting the roof\r\n- **Sanctuaries**: Inner chambers where sacred rituals occurred\r\n- **Courtyards**: Open-air spaces for ceremonies\r\n\r\nFamous temples include:\r\n- Karnak Temple (Thebes)\r\n- Luxor Temple\r\n- Temple of Kom Ombo\r\n- Abu Simbel\r\n\r\n### Tombs and Mastabas\r\nBefore pyramids, Egyptian elites were buried in mastabas—rectangular structures built above underground burial chambers.\r\n\r\n## Building Materials and Construction\r\n\r\n### Stone\r\nGranite, limestone, and sandstone were primary materials. Egyptian builders:\r\n- Quarried stones using copper tools and wooden wedges\r\n- Transported blocks using wooden sledges and water-based lubrication\r\n- Fitted stones with remarkable precision without mortar\r\n\r\n### Mud Brick\r\nCommon dwellings and administrative buildings used sun-dried mud bricks, a sustainable and efficient material.\r\n\r\n## Engineering and Precision\r\n\r\nEgyptian architects demonstrated sophisticated knowledge:\r\n- **Geometrical accuracy**: Pyramids aligned with cardinal directions with extraordinary precision\r\n- **Square and level construction**: Used simple tools like plumb bobs and water levels\r\n- **Structural engineering**: Understanding of load distribution and support systems\r\n\r\n## Decorative Elements\r\n\r\n### Hieroglyphics\r\nWriting systems decorated tomb and temple walls, serving both religious and practical functions.\r\n\r\n### Reliefs and Paintings\r\nColorful hieroglyphic texts and images covered interior walls, preserving historical and religious information.\r\n\r\n### Columns\r\nEgyptian columns served both structural and decorative purposes:\r\n- **Lotus columns**: Inspired by papyrus plants\r\n- **Bud columns**: Simpler capital designs\r\n- **Composite columns**: Combined multiple botanical forms\r\n\r\n## Legacy and Influence\r\nEgyptian architecture influenced:\r\n- Classical Greek architecture\r\n- Roman temple designs\r\n- Renaissance revival movements\r\n- Modern architectural theory\r\n\r\n## Preservation and Study\r\nModern technology aids in understanding ancient Egyptian methods:\r\n- 3D scanning reveals internal structures\r\n- Chemical analysis determines material sources\r\n- Digital reconstruction shows original appearance\r\n- Experimental archaeology tests ancient techniques\r\n\r\n## Conclusion\r\nAncient Egyptian architecture stands as a testament to human ingenuity, vision, and perseverance. These monumental structures have outlasted empires and continue to inspire and fascinate people worldwide, representing the enduring human desire to create structures that transcend time.', 'https://tse4.mm.bing.net/th/id/OIP.BHduw4VKVkYhnJ2KQmnMRAHaEU?rs=1&pid=ImgDetMain&o=7&rm=3', 'Egypt', 'published', NULL, 899, 45, 3, 5, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-06 12:08:12'),
(3, 2, 3, NULL, 'Ancient Greece: Democracy and Philosophy', 'ancient-greece-democracy-and-philosophy', 'How Greek city-states shaped Western political thought and philosophical traditions.', '## Overview\r\nAncient Greece, particularly Athens during the Classical period (5th-4th centuries BCE), gave birth to democracy and Western philosophy. These twin developments profoundly shaped the course of human civilization.\r\n\r\n## The Birth of Democracy\r\n\r\n### Early Forms of Government\r\nBefore democracy, Greek city-states were governed by:\r\n- **Monarchies**: Rule by kings\r\n- **Aristocracies**: Rule by nobility\r\n- **Tyrannies**: Rule by individuals who seized power\r\n\r\n### Cleisthenes and Athenian Democracy (509 BCE)\r\nCleisthenes is credited with establishing the foundations of Athenian democracy:\r\n- Created the **Assembly** (Ekklesia): Direct participation by citizens\r\n- Reformed tribalistic divisions to reduce aristocratic power\r\n- Established the **Council** (Boule) of 500 members\r\n- Introduced **ostracism**: A process to exile political threats\r\n\r\n### Pericles and the Golden Age (461-429 BCE)\r\nUnder Pericles, Athenian democracy reached its peak:\r\n- Opened government positions to all citizens\r\n- Introduced payment for public service\r\n- Expansion of democratic institutions\r\n- Cultural flourishing including the Parthenon construction\r\n\r\n## Democratic Institutions\r\n\r\n### The Assembly (Ekklesia)\r\n- Open to all male citizens over 18\r\n- Met 40 times yearly on the Pnyx hill\r\n- Required quorum of 6,000 for major decisions\r\n- Debated and voted on all major policies\r\n\r\n### The Council (Boule)\r\n- 500 members selected by lottery\r\n- Prepared legislation for Assembly\r\n- Handled daily administration\r\n- Members served one-year terms\r\n\r\n### The Courts (Dikasteria)\r\n- Juries of 201-2,501 citizens\r\n- Decided legal cases through majority vote\r\n- Paid service to encourage participation\r\n- Safeguard against tyranny\r\n\r\n## Golden Age Philosophers\r\n\r\n### Socrates (469-399 BCE)\r\n- Pioneered the **Socratic method**: Teaching through questioning\r\n- Focused on ethical knowledge and virtue\r\n- Challenged conventional wisdom\r\n- Executed on charges of corrupting youth and impiety\r\n\r\n### Plato (428-348 BCE)\r\n- Student of Socrates\r\n- Founded the Academy in Athens\r\n- Developed theory of **ideal Forms** (unchanging, perfect forms of things)\r\n- Wrote influential dialogues featuring Socrates\r\n- Works: *Republic*, *Symposium*, *Apology*\r\n\r\n### Aristotle (384-322 BCE)\r\n- Student of Plato\r\n- Founded the Lyceum school\r\n- Developed **empirical** approach based on observation\r\n- Created system of formal logic\r\n- Works: *Nicomachean Ethics*, *Politics*, *Metaphysics*\r\n\r\n## Major Philosophical Contributions\r\n\r\n### Epistemology (Theory of Knowledge)\r\n- How do we know what we know?\r\n- Socrates: Knowledge through questioning and examination\r\n- Plato: Knowledge of eternal Forms\r\n- Aristotle: Knowledge through observation and logic\r\n\r\n### Ethics\r\n- What makes a person good?\r\n- Socrates: Virtue is knowledge\r\n- Plato: Justice is harmony of the soul\r\n- Aristotle: Virtue as the mean between extremes\r\n\r\n### Politics\r\n- How should society be organized?\r\n- Democratic participation\r\n- Justice and law\r\n- The ideal state\r\n\r\n## Other Philosophical Schools\r\n\r\n### Stoicism\r\n- Virtue as the highest good\r\n- Living in harmony with nature and reason\r\n- Acceptance of fate\r\n\r\n### Epicureanism\r\n- Often misunderstood as hedonism\r\n- Actually advocated simple pleasures and freedom from fear\r\n- Founded by Epicurus\r\n\r\n### Cynicism\r\n- Virtue is the only true good\r\n- Rejection of social conventions\r\n- Famous for Diogenes living in a barrel\r\n\r\n## Mathematics and Natural Philosophy\r\n\r\n### Euclid\r\n- Systematized geometry\r\n- *Elements*: The most influential mathematical work in history\r\n\r\n### Pythagoras\r\n- Pythagorean theorem\r\n- Understanding harmony in music and mathematics\r\n\r\n### Thales of Miletus\r\n- First philosopher to seek natural explanations\r\n- Founder of Western philosophy\r\n\r\n## Legacy and Influence\r\n\r\n### Political Legacy\r\n- Democratic principles still influence modern governments\r\n- Concepts of citizenship and civic participation\r\n- Importance of public debate and deliberation\r\n\r\n### Philosophical Legacy\r\n- Foundation of Western philosophy\r\n- Methods of logical reasoning\r\n- Ethical frameworks still studied today\r\n- Categories and systems of thought\r\n\r\n### Educational Legacy\r\n- Establishment of schools and systematic education\r\n- Liberal arts education model\r\n- Pursuit of knowledge as a noble goal\r\n\r\n## Decline and Transformation\r\n- Alexander the Great\'s conquests spread Greek culture\r\n- Hellenistic period: Greek philosophy spreads throughout Mediterranean\r\n- Roman conquest: Greek thought incorporated into Roman civilization\r\n- Influence on early Christian theology\r\n\r\n## Conclusion\r\nAncient Greece\'s contributions to democracy and philosophy remain unparalleled. The democratic experiments of Athens provided a model for future republican and democratic systems, while Greek philosophers established the methods and questions that still drive intellectual inquiry today. These twin legacies demonstrate humanity\'s capacity for both political innovation and intellectual achievement.', 'https://tse3.mm.bing.net/th/id/OIP.2u5BsB4I-VkkLgORSufJOQHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', 'Greece', 'published', NULL, 1210, 67, 5, 8, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-06 11:28:25'),
(4, 1, 4, NULL, 'Aztec Empire and Culture', 'aztec-empire-and-culture', 'The rise and fall of the Aztec Empire and its rich cultural heritage.', '## Overview\r\nThe Aztec Empire represents one of the most sophisticated pre-Columbian societies in Mesoamerica. This advanced culture developed complex social structures, innovative agricultural techniques, and extensive trade networks throughout the Valley of Mexico.\r\n\r\n## Early Settlement (1300 CE - 1428 CE)\r\nArchaeological evidence suggests the Mexica people migrated from the north and settled at Lake Texcoco in the early 14th century. Initially nomadic, they adapted to the marshy environment and began constructing the city of Tenochtitlán on a man-made island.\r\n\r\n## Development of Agricultural States (1428 CE - 1521 CE)\r\nBy 1428, the Triple Alliance was formed, creating a powerful empire. This society developed sophisticated agricultural systems including:\r\n\r\nChinampas (Floating Gardens): A form of lake-bed agriculture created by layering mud and vegetation to form fertile farming islands. This technique allowed for multiple harvests per year.\r\n\r\nDikes and Aqueducts: Engineering projects that separated salt water from fresh water and channeled drinking water into the city.\r\n\r\nManaged Ecosystems: A combination of aquatic farming and sustainable lake resource management.\r\n\r\n## Population and Settlement\r\nModern surveys reveal that Tenochtitlán was one of the largest cities in the world at the time. Population estimates suggest over 200,000 inhabitants in the capital and millions across the empire, organized into strict administrative units.\r\n\r\n## Culture and Society\r\nAztec society developed complex hierarchies with:\r\n\r\nReligious Leadership: Priests held supreme authority in performing sacrificial rituals believed to sustain the life of the Sun.\r\n\r\nWarfare and Tribute: An elite military system and a network of tax collection from conquered territories.\r\n\r\nArtistic Traditions: Production of intricate ceramics, massive stone sculptures, and rare feather-work garments.\r\n\r\n## Decline and Legacy\r\nThe arrival of the Spanish in 1519 brought devastating consequences through:\r\n\r\nThe spread of smallpox, which caused rapid population decline.\r\n\r\nMilitary conflicts and the fall of Tenochtitlán in 1521.\r\n\r\nThe destruction of temples and their replacement with colonial architecture.\r\n\r\n## Modern Understanding\r\nRecent archaeological discoveries have revolutionized our understanding of the Aztecs:\r\n\r\nExcavations at the Templo Mayor reveal the spiritual wealth and treasures of the empire.\r\n\r\nDNA and isotope analysis show the diversity of the capital\'s inhabitants.\r\n\r\nResearch into ancient Codices helps preserve knowledge of medicine and astronomy.\r\n\r\n## Conclusion\r\nThe Aztec civilization represents a remarkable achievement in human adaptation and development. Their legacy continues through the Nahuatl language and the cultural identity of modern Mexico.', 'https://tse2.mm.bing.net/th/id/OIP.PdB9yjPSunPOlmpjwYD4qAHaEK?rs=1&pid=ImgDetMain&o=7&rm=3', 'Mexico', 'published', NULL, 572, 34, 1, 4, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-06 11:59:24'),
(5, 2, 4, NULL, 'Byzantine Empire: Eastern Roman Legacy', 'byzantine-empire-eastern-roman-legacy', 'The continuation of Rome in the East and its profound influence on world history.', '## Overview\r\nThe Byzantine Empire, or Eastern Rome, represents a sophisticated continuation and transformation of the Roman legacy in the Mediterranean. This culture developed complex legal systems, innovative domed architecture, and trade networks connecting Europe and Asia.\r\n\r\n## Early Settlement (330 CE - 527 CE)\r\nThe formation began when Constantine the Great moved the capital to Byzantium, renamed Constantinople in 330. Its strategic location on the Bosphorus Strait made the city a bustling trade hub, blending Greek and Roman cultures.\r\n\r\n## Development of Imperial States (527 CE - 1025 CE)\r\nDuring the reign of Justinian, the empire reached its peak power. They developed sophisticated management systems including:\r\n\r\nCorpus Juris Civilis (Code of Justinian): The codification of Roman law, which became the foundation for modern civil law.\r\n\r\nPendentive Domes: Engineering techniques for building massive domes on square structures, exemplified by the Hagia Sophia.\r\n\r\nGreek Fire: A secret chemical weapon that helped protect the empire from naval attacks.\r\n\r\n## Population and Settlement\r\nConstantinople was the \"City of the World\'s Desire,\" with a peak population of approximately half a million. The empire controlled fertile lands in Egypt, Anatolia, and the Balkans, sustaining bustling urban centers.\r\n\r\n## Culture and Society\r\nByzantine society developed a centralized power structure with:\r\n\r\nTheocracy: The Emperor was considered the representative of God on Earth.\r\n\r\nPreservation of Knowledge: Byzantine scholars preserved and copied countless Greek philosophical and scientific works.\r\n\r\nMosaics and Icons: The art of gemstone mosaics and religious icon painting reached a master level.\r\n\r\n## Decline and Legacy\r\nThe Ottoman conquest in 1453 ended the empire\'s existence after centuries of weakening caused by:\r\n\r\nThe Crusades from the West, which drained resources.\r\n\r\nThe rise of Islamic powers and gradual loss of key territories.\r\n\r\nThe Black Death, which reduced the workforce and military strength.\r\n\r\n## Modern Understanding\r\nModern historical studies have re-evaluated the role of Byzantium:\r\n\r\nRecognizing Byzantium as the \"shield\" protecting Europe from eastern invasions for a millennium.\r\n\r\nThe migration of Byzantine scholars to Italy is seen as a spark for the Renaissance.\r\n\r\nUnderground archaeological research in Istanbul reveals massive and modern cistern systems.\r\n\r\n## Conclusion\r\nThe Byzantine Empire was the bridge between the ancient and modern worlds. Their resilience and creativity in preserving knowledge shaped the face of European civilization and Orthodox Christianity today.', 'https://th.bing.com/th/id/R.79608d79d096eeb61b5ec5729b3b0af3?rik=sDGBBUAcQguB3w&riu=http%3a%2f%2fbrewminate.com%2fwp-content%2fuploads%2f2017%2f01%2fByzantineEmpire02.jpg&ehk=nPFAujnnfgM4T%2fs9DZONubfMppo2TENF6YXQR4EIxeE%3d&risl=&pid=ImgRaw&r=0', 'Turkey', 'published', NULL, 734, 41, 2, 6, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 11:35:50'),
(6, 1, 4, NULL, 'Chinese Dynasties and Imperial Rule', 'chinese-dynasties-and-imperial-rule', 'An overview of China\'s dynastic history spanning over two millennia of imperial governance.', '## Overview\r\nChinese dynasties represent one of the longest-lasting and most stable political systems in human history. This system developed centralized governance, Confucian-based ruling philosophies, and the Silk Road trade network connecting Eurasia.\r\n\r\n## Early Settlement (2100 BCE - 221 BCE)\r\nArchaeological evidence shows the Yellow River and Yangtze River basins were the cradles of Chinese civilization. From early farming communities, the first dynasties like Xia, Shang, and Zhou emerged, developing bronze casting and oracle bone writing.\r\n\r\n## Development of Imperial States (221 BCE - 1912 CE)\r\nIn 221 BCE, Qin Shi Huang unified China, laying the foundation for an empire that lasted over two millennia with sophisticated systems:\r\n\r\nMandate of Heaven: A political philosophy that legitimized the Emperor\'s rule but also demanded responsibility toward the people.\r\n\r\nCivil Service Examination: A system for selecting officials based on merit and Confucian knowledge rather than bloodline.\r\n\r\nThe Great Wall & Grand Canal: Engineering mega-projects to protect borders and connect the North-South economy.\r\n\r\n## Population and Settlement\r\nChina has consistently been the world\'s most populous region. Han Dynasty censuses recorded tens of millions of people, concentrated in alluvial plains and major cities like Chang\'an and Luoyang.\r\n\r\n## Culture and Society\r\nImperial Chinese society developed complex layers:\r\n\r\nScholar-Officials (Shi): The intellectual class that held state management roles.\r\n\r\nPhilosophical Foundations: A blend of Confucianism (ethics), Taoism (nature), and Buddhism.\r\n\r\nFour Great Inventions: Paper, the compass, gunpowder, and printing changed the face of the world.\r\n\r\n## Decline and Legacy\r\nThe collapse of the imperial system in 1912 resulted from:\r\n\r\nBureaucratic stagnation and corruption.\r\n\r\nPressure from Western powers and Japan in the 19th century.\r\n\r\nLarge-scale peasant uprisings that exhausted national resources.\r\n\r\n## Modern Understanding\r\nModern archaeological discoveries have clarified Chinese history:\r\n\r\nThe excavation of the Terracotta Army reveals the incredible scale of Qin power.\r\n\r\nAncient hydrological studies show that controlling river flow was the key to political power.\r\n\r\n## Conclusion\r\nChinese dynasties are a testament to resilience and the ability to organize society on a massive scale. Their legacy of writing, thought, and culture remains the pillar of East Asia today.', 'https://img.freepik.com/premium-photo/china-snaking-through-dramatic-landscapes-symbolizing-rich-history-picturesque-tourist-destinationsgenerated-with-ai_130181-8062.jpg', 'China', 'published', NULL, 1573, 89, 4, 12, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-04 11:02:59'),
(7, 2, 5, NULL, 'Crusades: Religion and Warfare', 'crusades-religion-and-warfare', 'The series of religious wars between Christian and Muslim forces over the Holy Land.', '## Overview\r\nThe Crusades were a series of religious military campaigns between Christianity and Islam. This conflict drove the development of military orders, innovation in siege technology, and expanded East-West cultural exchange.\r\n\r\n## Early Context (1095 CE - 1100 CE)\r\nBeginning with Pope Urban II\'s call at the Council of Clermont in 1095, tens of thousands of knights and poor Europeans set out for the East. The initial goal was to liberate Jerusalem and assist the Byzantine Empire against the Seljuk Turks.\r\n\r\n## Development of Crusader States (1100 CE - 1291 CE)\r\nFollowing the First Crusade, Latin states were established in the Levant. This period saw advanced military techniques:\r\n\r\nConcentric Castles: Wall-within-a-wall castle designs that optimized defense.\r\n\r\nMilitary Orders: The birth of orders like the Knights Templar and the Hospitallers.\r\n\r\nSiege Engines: Improvements in the trebuchet and siege towers during city assaults.\r\n\r\n## Population and Settlement\r\nCrusader migrations brought thousands of Europeans to settle in cities like Antioch, Edessa, and Jerusalem, creating a culturally diverse but conflict-ridden society.\r\n\r\n## Culture and Society\r\nSociety during the Crusades was a unique blend of:\r\n\r\nChivalry: The code of ethics and combat for the Western European nobility.\r\n\r\nTrade Expansion: The rise of Italian trade cities like Venice and Genoa through access to Eastern goods.\r\n\r\nKnowledge Transfer: Bringing back Islamic medical, mathematical, and philosophical knowledge to Europe.\r\n\r\n## Decline and Legacy\r\nThe end of the Crusading era in 1291 brought deep impacts:\r\n\r\nThe fall of Christian outposts like Acre.\r\n\r\nThe increase in the power of monarchies in Europe over the church.\r\n\r\nPsychological and religious scars that still exist in East-West relations.\r\n\r\n## Modern Understanding\r\nModern historiography views the Crusades as more than just war:\r\n\r\nEconomic analysis shows that population pressure in Europe was a major driver.\r\n\r\nArchaeological studies in the Levant show periods of peaceful coexistence and frequent trade between civilians on both sides.\r\n\r\n## Conclusion\r\nThe Crusades were a tragic but vital chapter in history, where religious faith and the desire for power intertwined, shaping the face of modern Europe and the Middle East.', 'https://tse2.mm.bing.net/th/id/OIP.gHm5SH93NiF2a1fkX1yNMgHaDt?rs=1&pid=ImgDetMain&o=7&rm=3', 'Israel', 'published', NULL, 460, 0, 6, 3, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-06 12:08:23'),
(8, 1, 6, NULL, 'The Dark Ages and Medieval Europe', 'dark-ages-medieval-europe', 'Examining the period once dismissed as the Dark Ages and its complex reality.', 'The term \"Dark Ages\" has largely been abandoned by modern historians who recognize the medieval period (5th-15th centuries) as a time of significant cultural, technological, and intellectual development. Monasteries preserved classical learning, Gothic cathedrals demonstrated remarkable engineering, and universities emerged as centers of scholarship. Agricultural innovations like the heavy plow and three-field system transformed European farming. The medieval period also saw the development of parliamentary governance, common law, and vibrant urban cultures that laid the groundwork for the Renaissance and the modern world.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Carcassonne_wall.jpg/800px-Carcassonne_wall.jpg', 'Europe', 'published', NULL, 389, 22, 1, 2, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(9, 2, 4, NULL, 'Eastern Han Dynasty: Golden Age of China', 'eastern-han-dynasty-golden-age', 'The Eastern Han period and its contributions to Chinese civilization.', 'The Eastern Han Dynasty (25-220 CE) represented a period of remarkable cultural and scientific achievement in Chinese history. Under this dynasty, paper was refined by Cai Lun, Buddhism was introduced from India, and the seismoscope was invented by Zhang Heng. The capital Luoyang became a center of learning and culture. Eastern Han scholars produced important historical works and advanced mathematics and astronomy. However, the dynasty was ultimately weakened by court intrigues, eunuch influence, and the Yellow Turban Rebellion, leading to the Three Kingdoms period.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Luoyang_Eastern_Han_Dynasty_tomb_wallpainting.jpg/800px-Luoyang_Eastern_Han_Dynasty_tomb_wallpainting.jpg', 'China', 'published', NULL, 312, 19, 0, 1, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(10, 1, 4, NULL, 'French Revolution: From Monarchy to Republic', 'french-revolution-monarchy-to-republic', 'The dramatic overthrow of the French monarchy and birth of modern democratic ideals.', 'The French Revolution (1789-1799) fundamentally transformed France and influenced political systems worldwide. Beginning with the storming of the Bastille on July 14, 1789, the revolution abolished the feudal system, established the Declaration of the Rights of Man, and ultimately led to the execution of King Louis XVI. The revolution went through phases from constitutional monarchy to radical republicanism under Robespierre\'s Reign of Terror. While the revolution descended into violence and eventually gave rise to Napoleon\'s dictatorship, its ideals of liberty, equality, and fraternity continue to shape democratic movements globally.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg/800px-Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg', 'France', 'published', NULL, 680, 52, 3, 7, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-06 11:28:35'),
(11, 2, 7, NULL, 'Gutenberg and the Printing Revolution', 'gutenberg-printing-revolution', 'How movable type transformed communication and catalyzed the modern world.', 'Johannes Gutenberg\'s invention of the movable-type printing press around 1440 in Mainz, Germany, is considered one of the most important innovations in human history. His famous 42-line Bible, printed around 1455, demonstrated the technology\'s potential. The printing press dramatically reduced the cost of book production, democratized access to knowledge, and facilitated the spread of new ideas. It played a crucial role in the Protestant Reformation, the Scientific Revolution, and the Renaissance. By 1500, an estimated 20 million volumes had been printed in Europe, fundamentally altering literacy rates and intellectual discourse.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Printing3_Walk_of_Ideas_Berlin.JPG/800px-Printing3_Walk_of_Ideas_Berlin.JPG', 'Germany', 'published', NULL, 534, 38, 1, 4, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(12, 1, 1, NULL, 'Hindu Civilization: Ancient India', 'hindu-civilization-ancient-india', 'The Indus Valley civilization and the development of Hindu culture.', 'Hindu civilization traces its roots to the Indus Valley Civilization (3300-1300 BCE), one of the world\'s earliest urban cultures. The cities of Mohenjo-daro and Harappa featured advanced urban planning, drainage systems, and standardized weights. Hinduism, one of the world\'s oldest religions, developed through the Vedic period with sacred texts including the Rigveda, Upanishads, and later epics like the Mahabharata and Ramayana. Ancient Indian contributions to mathematics (the concept of zero, decimal system), astronomy, medicine (Ayurveda), and philosophy have profoundly influenced global civilization.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Taj_Mahal_%28Edited%29.jpeg/800px-Taj_Mahal_%28Edited%29.jpeg', 'India', 'published', NULL, 445, 31, 2, 3, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(13, 2, 4, NULL, 'Inca Empire: Master Builders of the Andes', 'inca-empire-master-builders', 'The remarkable engineering feats and governance of the Inca civilization.', 'The Inca Empire (1438-1533) was the largest empire in pre-Columbian America, stretching along the western coast of South America. Without a writing system, iron tools, or wheeled vehicles, the Incas built an extraordinary civilization. Machu Picchu, constructed around 1450, showcases their sophisticated stone masonry. The empire featured an extensive road network of over 40,000 km, a quipu system for record-keeping, and advanced agricultural terracing. The Incas administered a population of 12 million through an efficient bureaucratic system before the Spanish conquest led by Francisco Pizarro in 1533.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/800px-Machu_Picchu%2C_Peru.jpg', 'Peru', 'published', NULL, 623, 44, 1, 5, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(14, 1, 6, NULL, 'Islamic Golden Age: Science and Culture', 'islamic-golden-age-science-culture', 'The flourishing of science, art, and learning in the medieval Islamic world.', 'The Islamic Golden Age (8th-14th centuries) was a period of extraordinary cultural, economic, and scientific flourishing. Centered in Baghdad\'s House of Wisdom, scholars translated and expanded upon Greek, Persian, and Indian texts. Al-Khwarizmi developed algebra, Ibn al-Haytham pioneered optics, and Ibn Sina (Avicenna) wrote the Canon of Medicine, used as a textbook for centuries. Islamic civilization also advanced architecture (Alhambra), literature (One Thousand and One Nights), and navigation. This era of learning preserved classical knowledge and made original contributions that would later spark the European Renaissance.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Alhambra-Granada-2003.jpg/800px-Alhambra-Granada-2003.jpg', 'Iraq', 'published', NULL, 789, 56, 2, 6, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(15, 2, 6, NULL, 'Japanese Samurai and Feudal Society', 'japanese-samurai-feudal-society', 'The warrior class that shaped Japan\'s medieval history and cultural identity.', 'The samurai warrior class dominated Japanese society from the 12th to 19th centuries. Emerging as military servants of provincial lords, samurai developed bushido—a code of honor emphasizing loyalty, martial arts mastery, and self-discipline. The feudal structure, with the shogun at its apex, created a stable but rigid social hierarchy. Samurai culture produced lasting contributions to Japanese arts including the tea ceremony, Noh theater, and zen gardens. The Meiji Restoration of 1868 formally abolished the samurai class, but their cultural legacy continues to influence Japanese society and global popular culture.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sengakuji_47_ronin_graves.jpg/800px-Sengakuji_47_ronin_graves.jpg', 'Japan', 'published', NULL, 934, 62, 3, 9, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(16, 1, 4, NULL, 'Korean Three Kingdoms Era', 'korean-three-kingdoms-era', 'The Goguryeo, Baekje, and Silla kingdoms that shaped Korean civilization.', 'The Three Kingdoms period of Korea (57 BCE - 668 CE) saw three rival kingdoms compete for dominance on the Korean peninsula. Goguryeo in the north was known for its military prowess, Baekje in the southwest for its cultural refinement and maritime trade, and Silla in the southeast eventually unified the peninsula with Tang Dynasty assistance. This era produced remarkable cultural achievements including the Seokguram Grotto, Bulguksa Temple, and the oldest astronomical observatory in East Asia, Cheomseongdae. Buddhism flourished, and Korean arts and technology influenced neighboring Japan.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Bulguksa_temple.jpg/800px-Bulguksa_temple.jpg', 'South Korea', 'published', NULL, 278, 16, 1, 2, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(17, 2, 6, NULL, 'Leonardo da Vinci: Renaissance Master', 'leonardo-da-vinci-renaissance-master', 'The life and genius of history\'s greatest polymath.', 'Leonardo da Vinci (1452-1519) epitomized the Renaissance ideal of the universal man. His paintings, including the Mona Lisa and The Last Supper, are among the most famous artworks in history. Beyond art, Leonardo made groundbreaking contributions to anatomy, engineering, optics, and hydrodynamics. His notebooks, filled with detailed observations and inventions centuries ahead of their time—including designs for flying machines and armored vehicles—reveal a mind of extraordinary range. Working for patrons from Lorenzo de\' Medici to Francis I of France, Leonardo bridged art and science in ways that continue to inspire.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg', 'Italy', 'published', NULL, 1458, 98, 2, 11, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 10:18:17'),
(18, 1, 3, NULL, 'Magna Carta: Foundation of Democracy', 'magna-carta-foundation-democracy', 'The charter that established the principle that everyone is subject to law.', 'The Magna Carta, sealed by King John of England at Runnymede on June 15, 1215, is one of the most important legal documents in history. Forced upon the king by rebellious barons, it established that the monarch was not above the law and guaranteed certain rights including trial by jury and habeas corpus. Although initially a practical solution to a political crisis, the Magna Carta\'s principles became foundational to constitutional law worldwide. Its influence can be traced through the English Bill of Rights (1689), the United States Constitution, and the Universal Declaration of Human Rights.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Magna_Carta_%28British_Library_Cotton_MS_Augustus_II.106%29.jpg/800px-Magna_Carta_%28British_Library_Cotton_MS_Augustus_II.106%29.jpg', 'England', 'published', NULL, 567, 39, 1, 4, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(19, 2, 1, NULL, 'Mesopotamian Civilization: Cradle of History', 'mesopotamian-civilization-cradle', 'The birthplace of writing, law, and urban civilization between the Tigris and Euphrates.', 'Mesopotamia, located in modern-day Iraq between the Tigris and Euphrates rivers, is often called the \"Cradle of Civilization.\" The Sumerians developed cuneiform writing around 3400 BCE, creating the earliest known written records. Hammurabi\'s Code (c. 1754 BCE) was one of the earliest comprehensive legal codes. Mesopotamian innovations include the wheel, the plow, irrigation systems, and the 60-minute hour. The region saw the rise of major civilizations including the Akkadians, Babylonians, and Assyrians, each contributing to the cultural and technological foundations upon which later civilizations would build.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Pergamonmuseum_Ishtartor_02.jpg/800px-Pergamonmuseum_Ishtartor_02.jpg', 'Iraq', 'published', NULL, 678, 42, 2, 5, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(20, 1, 4, NULL, 'Ming Dynasty: China\'s Golden Age', 'ming-dynasty-china-golden-age', 'The dynasty that built the Great Wall, the Forbidden City, and launched great naval expeditions.', 'The Ming Dynasty (1368-1644) is celebrated as one of the greatest eras of orderly government and social stability in Chinese history. Founded by Zhu Yuanzhang after overthrowing the Mongol Yuan Dynasty, the Ming oversaw the construction of the Forbidden City in Beijing, the restoration and extension of the Great Wall, and Admiral Zheng He\'s remarkable naval expeditions across the Indian Ocean. Ming porcelain became world-renowned, and the era produced significant literary works including the novel Journey to the West. The dynasty\'s isolationist policies in later years, however, left China unprepared for European colonial expansion.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Forbidden_City_Beijing.jpg/800px-Forbidden_City_Beijing.jpg', 'China', 'published', NULL, 856, 53, 2, 7, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(21, 2, 5, NULL, 'Norman Conquest and Medieval England', 'norman-conquest-medieval-england', 'How William the Conqueror reshaped the English nation in 1066.', 'The Norman Conquest of 1066, following William the Conqueror\'s victory at the Battle of Hastings, fundamentally transformed England. The Normans introduced feudalism, rebuilt nearly every major church, and erected imposing castles including the Tower of London. The Domesday Book of 1086 was an unprecedented survey of English landholding. Norman French became the language of the ruling class, enriching English with thousands of French-derived words. The conquest created a new Anglo-Norman culture that blended English and French traditions, reshaping English law, governance, architecture, and language for centuries to come.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Tower_of_London%2C_April_2006.jpg/800px-Tower_of_London%2C_April_2006.jpg', 'England', 'published', NULL, 345, 21, 1, 3, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(22, 1, 4, NULL, 'Ottoman Empire: Bridge Between Continents', 'ottoman-empire-bridge-continents', 'Six centuries of Ottoman rule spanning three continents.', 'The Ottoman Empire (1299-1922) was one of the longest-lasting and most influential empires in world history. At its height under Suleiman the Magnificent, it controlled vast territories across Southeast Europe, Western Asia, and North Africa. The Ottomans developed sophisticated administrative systems, remarkable architecture (Suleymaniye Mosque), and a cosmopolitan culture. The empire served as a bridge between East and West, facilitating trade and cultural exchange. The Ottoman millet system allowed religious minorities significant autonomy. The empire\'s decline and dissolution after World War I reshaped the modern Middle East.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/S%C3%BCleymaniye_Mosque%2C_Istanbul.jpg/800px-S%C3%BCleymaniye_Mosque%2C_Istanbul.jpg', 'Turkey', 'published', NULL, 567, 35, 2, 5, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(23, 2, 3, NULL, 'Philosophers of Ancient Greece', 'philosophers-ancient-greece', 'From Socrates to Aristotle: the thinkers who shaped Western intellectual tradition.', 'The philosophers of ancient Greece created the intellectual foundations of Western civilization. Socrates (470-399 BCE) pioneered the method of dialectical questioning. His student Plato founded the Academy and developed the theory of Forms. Aristotle, Plato\'s student, made contributions to logic, biology, ethics, and politics that remained authoritative for nearly two millennia. Pre-Socratic thinkers like Thales and Heraclitus asked fundamental questions about the nature of reality. Later schools including Stoicism and Epicureanism offered practical philosophies for living well. Greek philosophical inquiry established the tradition of rational investigation that characterizes Western thought.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Socrates_Louvre.jpg/800px-Socrates_Louvre.jpg', 'Greece', 'published', NULL, 923, 71, 3, 8, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(24, 1, 4, NULL, 'Qin Dynasty: First Imperial Dynasty', 'qin-dynasty-first-imperial', 'The dynasty that unified China and laid the foundations of the imperial system.', 'The Qin Dynasty (221-206 BCE), though short-lived, established the template for Chinese imperial governance that would endure for over two millennia. Qin Shi Huang, the first emperor, unified the warring states, standardized weights, measures, currency, and the Chinese writing system. He ordered the construction of the first Great Wall and was buried with the famous Terracotta Army of over 8,000 life-sized warriors. The dynasty implemented Legalist philosophy, creating a centralized bureaucratic state. Despite its authoritarian nature and rapid fall, the Qin\'s administrative innovations shaped all subsequent Chinese dynasties.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Terracotta_Army%2C_View_of_Pit_1.jpg/800px-Terracotta_Army%2C_View_of_Pit_1.jpg', 'China', 'published', NULL, 745, 48, 2, 6, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(25, 2, 4, NULL, 'Russian Empire and Tsardom', 'russian-empire-tsardom', 'The growth of Russia from a medieval duchy to a continental empire.', 'The Russian Empire grew from the Grand Duchy of Moscow to become one of the largest empires in history. Ivan the Terrible became the first Tsar in 1547, and Peter the Great (r. 1682-1725) modernized Russia and founded St. Petersburg. Catherine the Great expanded Russian territory and promoted Enlightenment ideals. The empire\'s vast geographic span, from Poland to Alaska, created unique challenges in governance. Russian culture flourished with authors like Tolstoy and Dostoevsky, composers like Tchaikovsky, and scientists like Mendeleev. The empire ended with the Russian Revolution of 1917, giving rise to the Soviet Union.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Saint_Basils_Cathedral_in_Moscow.jpg/800px-Saint_Basils_Cathedral_in_Moscow.jpg', 'Russia', 'published', NULL, 423, 27, 2, 4, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(26, 1, 7, NULL, 'Spanish Inquisition and Religious History', 'spanish-inquisition-religious-history', 'The controversial institution established to maintain Catholic orthodoxy in Spain.', 'The Spanish Inquisition, established in 1478 by Ferdinand and Isabella, was a judicial institution tasked with maintaining religious orthodoxy. Initially targeting converted Jews (conversos) suspected of practicing Judaism secretly, it later focused on Protestant sympathizers and other perceived heretics. The Inquisition used tribunals, investigations, and sometimes torture to pursue its aims. While its severity has often been exaggerated in popular culture, it nevertheless had profound effects on Spanish society, leading to the expulsion of Jews in 1492 and contributing to intellectual conservatism. It was not formally abolished until 1834.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/El_Escorial_View_from_the_north.jpg/800px-El_Escorial_View_from_the_north.jpg', 'Spain', 'published', NULL, 312, 18, 4, 3, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(27, 2, 4, NULL, 'Tang Dynasty: Cosmopolitan Age', 'tang-dynasty-cosmopolitan-age', 'China\'s most cosmopolitan dynasty and its golden age of poetry and art.', 'The Tang Dynasty (618-907 CE) is widely regarded as the golden age of Chinese civilization. Under Emperor Taizong and his successors, China became the most powerful and cosmopolitan civilization in the world. The capital Chang\'an was the world\'s largest city, home to over one million inhabitants from diverse cultures. Tang poetry, particularly the works of Li Bai and Du Fu, reached heights never surpassed. The dynasty perfected the civil service examination system, developed woodblock printing, and fostered advances in medicine, cartography, and technology. The Silk Road flourished, connecting China with Central Asia and beyond.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Tang_dynasty1.PNG/800px-Tang_dynasty1.PNG', 'China', 'published', NULL, 634, 43, 1, 5, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(28, 1, 3, NULL, 'University System in Medieval Europe', 'university-system-medieval-europe', 'The birth and evolution of the university as an institution of higher learning.', 'The medieval university system emerged in Europe during the 11th and 12th centuries, creating institutions that persist to this day. The University of Bologna (1088) and the University of Paris (c. 1150) were among the earliest. These institutions developed the structures still familiar today: faculties, degrees, lectures, and examinations. Medieval universities focused on the liberal arts, theology, law, and medicine. They enjoyed significant autonomy and attracted scholars from across Europe, creating a shared intellectual culture. The scholastic method, combining faith with reason, produced influential thinkers like Thomas Aquinas and Roger Bacon.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Bologna-vista02.jpg/800px-Bologna-vista02.jpg', 'Italy', 'published', NULL, 289, 17, 0, 2, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50');
INSERT INTO `articles` (`id`, `author_id`, `category_id`, `current_edit_id`, `title`, `slug`, `summary`, `content`, `image_url`, `country`, `status`, `tag_ids`, `view_count`, `like_count`, `dislike_count`, `comment_count`, `published_at`, `created_at`, `updated_at`) VALUES
(29, 2, 1, NULL, 'Vietnamese History: From Ancient Times', 'vietnamese-history-ancient-times', 'The rich history of Vietnam from the Bronze Age to independence.', 'Vietnamese civilization traces its origins to the Dong Son culture (c. 1000 BCE), famous for its bronze drums. The legendary Hung Kings established the kingdom of Van Lang, considered the first Vietnamese state. After a millennium of Chinese domination (111 BCE - 938 CE), Vietnam regained independence under Ngo Quyen\'s victory at the Battle of Bach Dang River. Subsequent dynasties including the Ly, Tran, and Le developed a distinctive Vietnamese Buddhist culture, Confucian governance system, and resilient national identity. Vietnam\'s history of resistance against foreign powers—Chinese, Mongol, French, and American—has shaped a deeply patriotic national character.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Temple_of_Literature3.jpg/800px-Temple_of_Literature3.jpg', 'Vietnam', 'published', NULL, 567, 34, 1, 4, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(30, 1, 4, NULL, 'Western Roman Empire: Rise and Fall', 'western-roman-empire-rise-fall', 'The dramatic arc of Rome from a small city-state to a vast empire and its eventual collapse.', 'The Western Roman Empire represents one of history\'s greatest civilizations. From its legendary founding in 753 BCE, Rome grew from a small city-state to control the entire Mediterranean world. Roman innovations in law, engineering (aqueducts, roads, concrete), governance, and military organization laid foundations for Western civilization. At its height under Emperor Trajan (117 CE), the empire encompassed 5 million square kilometers. However, internal weaknesses including political instability, economic troubles, and military overextension, combined with barbarian invasions, led to the fall of the Western Empire in 476 CE when the last emperor, Romulus Augustulus, was deposed.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Colosseum_in_Rome-April_2007-1-_copie_2B.jpg/800px-Colosseum_in_Rome-April_2007-1-_copie_2B.jpg', 'Italy', 'published', NULL, 1236, 76, 3, 9, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 10:18:42'),
(31, 1, 6, NULL, 'Dong Son Bronze Drum Collection', 'dong-son-bronze-drum-collection', 'Vietnam\'s iconic Bronze Age artifacts and their cultural significance.', 'The Dong Son bronze drums, dating from approximately 600 BCE to 200 CE, are among Southeast Asia\'s most important archaeological artifacts. These elaborately decorated drums, first discovered in Dong Son village in Thanh Hoa province, Vietnam, feature intricate geometric patterns, scenes of daily life, and representations of boats, warriors, and wildlife. The largest known example, the Ngoc Lu drum, weighs over 70 kg. These drums served ceremonial, political, and musical purposes, and their distribution across Southeast Asia demonstrates ancient maritime trade networks. They remain powerful symbols of Vietnamese cultural identity and are recognized as national treasures.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/SongDaBronzeDrum.jpg/800px-SongDaBronzeDrum.jpg', 'Vietnam', 'published', NULL, 345, 23, 0, 3, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(32, 2, 6, NULL, 'Silk Road Trade Routes', 'silk-road-trade-routes', 'The ancient network of trade routes connecting East and West.', 'The Silk Road was a network of trade routes connecting China with the Mediterranean world, spanning over 6,000 kilometers through Central Asia. Active from the 2nd century BCE through the 15th century CE, these routes facilitated not just the trade of silk, spices, precious metals, and gems, but also the exchange of ideas, religions, technologies, and diseases. Buddhism spread from India to China along these routes, while Islam later traveled eastward. Caravanserais (roadside inns) supported merchants crossing harsh deserts and mountain passes. The maritime Silk Road also connected ports from China to East Africa, shaping global commerce.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Silk_Road_in_the_I_century_AD_-_en.svg/800px-Silk_Road_in_the_I_century_AD_-_en.svg.png', 'China', 'published', NULL, 678, 45, 1, 6, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(33, 1, 6, NULL, 'Colonial Maps of Indochina', 'colonial-maps-indochina', 'French cartographic legacy and the mapping of Southeast Asia.', 'The colonial mapping of Indochina represents a fascinating intersection of cartography, imperialism, and geographic knowledge. French colonial authorities conducted extensive surveys of Vietnam, Laos, and Cambodia from the mid-19th century, producing detailed maps that served administrative, military, and economic purposes. These maps incorporated both European cartographic techniques and local geographic knowledge. The Mekong Exploration Commission (1866-1868) produced some of the earliest detailed maps of the region. Today, these colonial maps serve as invaluable historical documents, revealing how European powers understood and organized Southeast Asian territories during the colonial era.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/French_Indochina_map.png/800px-French_Indochina_map.png', 'France', 'published', NULL, 234, 14, 1, 2, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(34, 2, 8, NULL, 'History of the Olympic Games', 'history-olympic-games', 'From ancient Olympia to the modern global sporting event.', 'The Olympic Games trace their origins to ancient Greece, where athletic competitions were held at Olympia from 776 BCE to 393 CE. These ancient games included events like the stadion foot race, wrestling, boxing, and chariot racing, and were held every four years as part of a religious festival honoring Zeus. The modern Olympic Games were revived by Pierre de Coubertin in 1896 in Athens, with 241 athletes from 14 nations. The Olympics have since grown into the world\'s largest sporting event, with over 11,000 athletes from 200+ nations competing. The games have been shaped by political events including boycotts, terrorism, and the ongoing pursuit of athletic excellence.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Olympic_flag.jpg/800px-Olympic_flag.jpg', 'Greece', 'published', NULL, 567, 39, 1, 5, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50'),
(35, 1, 8, NULL, 'The Evolution of Football Worldwide', 'evolution-football-worldwide', 'How football became the world\'s most popular sport.', 'Football (soccer) has evolved from ancient ball-kicking games into the world\'s most popular sport with an estimated 4 billion fans. While various cultures played ball games throughout history, modern football was codified in England with the formation of The Football Association in 1863. The first FIFA World Cup was held in Uruguay in 1930. Football spread globally through British colonial influence and became deeply embedded in national cultures worldwide. Legendary players from Pelé to Maradona to Messi have elevated the sport to an art form. Today, football serves as a powerful force for social cohesion, national identity, and international diplomacy.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Football_in_Bloomsbury.jpg/800px-Football_in_Bloomsbury.jpg', 'England', 'published', NULL, 789, 54, 2, 7, '2026-04-02 09:15:50', '2026-04-02 09:15:50', '2026-04-02 09:15:50');

-- --------------------------------------------------------

--
-- Table structure for table `article_tags`
--

CREATE TABLE `article_tags` (
  `article_id` bigint(20) NOT NULL,
  `tag_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `article_topics`
--

CREATE TABLE `article_topics` (
  `article_id` bigint(20) NOT NULL,
  `topic_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `authors`
--

CREATE TABLE `authors` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(300) DEFAULT NULL,
  `biography` text DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `nationality` varchar(80) DEFAULT NULL,
  `birth_year` int(11) DEFAULT NULL,
  `death_year` int(11) DEFAULT NULL,
  `era` varchar(80) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `authors`
--

INSERT INTO `authors` (`id`, `name`, `slug`, `biography`, `image_url`, `nationality`, `birth_year`, `death_year`, `era`, `created_at`) VALUES
(1, 'Herodotus', 'herodotus', 'Known as the Father of History, Herodotus wrote The Histories, the first great narrative history of the ancient world, documenting the Greco-Persian Wars and the cultures of the ancient Mediterranean.', NULL, 'Greek', -484, -425, 'Ancient', '2026-04-02 08:45:06'),
(2, 'Ibn Khaldun', 'ibn-khaldun', 'A pioneering Arab historian and social scientist whose Muqaddimah introduced a scientific approach to the study of history, sociology, and economics.', NULL, 'Tunisian', 1332, 1406, 'Medieval', '2026-04-02 08:45:06'),
(3, 'Edward Gibbon', 'edward-gibbon', 'English historian best known for The History of the Decline and Fall of the Roman Empire, a landmark work of historiography.', NULL, 'British', 1737, 1794, 'Enlightenment', '2026-04-02 08:45:06'),
(4, 'Thucydides', 'thucydides', 'Athenian historian who wrote the History of the Peloponnesian War, considered a foundational work of political realism and scientific history.', NULL, 'Greek', -460, -400, 'Ancient', '2026-04-02 08:45:06'),
(5, 'Sima Qian', 'sima-qian', 'The Grand Historian of China who wrote the Records of the Grand Historian, establishing the model for Chinese historical writing.', NULL, 'Chinese', -145, -86, 'Ancient', '2026-04-02 08:45:06'),
(6, 'Barbara Tuchman', 'barbara-tuchman', 'American historian known for her vivid narrative style. Won two Pulitzer Prizes for The Guns of August and Stilwell and the American Experience in China.', NULL, 'American', 1912, 1989, 'Modern', '2026-04-02 08:45:06'),
(7, 'Fernand Braudel', 'fernand-braudel', 'French historian who revolutionized historiography with his concept of longue durée and his monumental work on the Mediterranean world.', NULL, 'French', 1902, 1985, 'Modern', '2026-04-02 08:45:06'),
(8, 'Nguyen Trai', 'nguyen-trai', 'Vietnamese scholar, poet, and political advisor who authored the Great Proclamation of Independence. A key figure in Vietnamese literary and political history.', NULL, 'Vietnamese', 1380, 1442, 'Medieval', '2026-04-02 08:45:06');

-- --------------------------------------------------------

--
-- Table structure for table `author_articles`
--

CREATE TABLE `author_articles` (
  `author_id` bigint(20) NOT NULL,
  `article_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `books`
--

CREATE TABLE `books` (
  `id` bigint(20) NOT NULL,
  `author_id` bigint(20) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(300) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `publication_year` int(11) DEFAULT NULL,
  `isbn` varchar(20) DEFAULT NULL,
  `genre` varchar(60) DEFAULT NULL,
  `rating` float DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `books`
--

INSERT INTO `books` (`id`, `author_id`, `title`, `slug`, `description`, `image_url`, `publication_year`, `isbn`, `genre`, `rating`, `created_at`) VALUES
(1, 1, 'The Histories', 'the-histories', 'A record of the Greco-Persian Wars and an exploration of the cultures and geography of the ancient world.', NULL, -430, NULL, 'History', 4.5, '2026-04-02 08:45:06'),
(2, 2, 'Muqaddimah', 'muqaddimah', 'A pioneering work on the philosophy of history, sociology, and economics.', NULL, 1377, NULL, 'Philosophy of History', 4.7, '2026-04-02 08:45:06'),
(3, 3, 'The History of the Decline and Fall of the Roman Empire', 'decline-fall-roman-empire', 'A comprehensive six-volume history tracing Rome from the height of the empire to the fall of Constantinople.', NULL, 1776, NULL, 'History', 4.4, '2026-04-02 08:45:06'),
(4, 4, 'History of the Peloponnesian War', 'history-peloponnesian-war', 'An account of the war between Athens and Sparta, considered a masterpiece of political and military analysis.', NULL, -411, NULL, 'Military History', 4.6, '2026-04-02 08:45:06'),
(5, 5, 'Records of the Grand Historian', 'records-grand-historian', 'A monumental history of China from the Yellow Emperor to Emperor Wu of Han.', NULL, -94, NULL, 'History', 4.5, '2026-04-02 08:45:06'),
(6, 6, 'The Guns of August', 'guns-of-august', 'A Pulitzer Prize-winning account of the first month of World War I.', NULL, 1962, NULL, 'Military History', 4.6, '2026-04-02 08:45:06'),
(7, 6, 'A Distant Mirror', 'distant-mirror', 'A vivid account of the calamitous 14th century in Europe.', NULL, 1978, NULL, 'History', 4.4, '2026-04-02 08:45:06'),
(8, 7, 'The Mediterranean and the Mediterranean World', 'mediterranean-world', 'A groundbreaking study of the Mediterranean region during the age of Philip II.', NULL, 1949, NULL, 'History', 4.3, '2026-04-02 08:45:06'),
(9, 7, 'Civilization and Capitalism', 'civilization-capitalism', 'A three-volume exploration of economic history from the 15th to 18th centuries.', NULL, 1979, NULL, 'Economic History', 4.5, '2026-04-02 08:45:06'),
(10, 8, 'Binh Ngo Dai Cao', 'binh-ngo-dai-cao', 'The Great Proclamation upon the Pacification of the Wu, a declaration of Vietnamese independence.', NULL, 1428, NULL, 'Political Literature', 4.8, '2026-04-02 08:45:06'),
(11, 1, 'On the Custom of the Persians', 'custom-of-persians', 'A detailed ethnographic study of Persian customs, religion, and governance from The Histories.', NULL, -430, NULL, 'Ethnography', 4.2, '2026-04-02 08:45:06'),
(12, 4, 'Melian Dialogue', 'melian-dialogue', 'A famous passage on power politics between Athens and the island of Melos.', NULL, -416, NULL, 'Political Philosophy', 4.5, '2026-04-02 08:45:06');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `icon` varchar(10) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `icon`, `created_at`) VALUES
(1, 'Civilizations', 'Ancient and modern civilizations', '🏛️', '2026-04-02 08:45:06'),
(2, 'Architecture', 'Historical architecture and monuments', '🏗️', '2026-04-02 08:45:06'),
(3, 'Philosophy', 'Philosophical movements and thinkers', '📜', '2026-04-02 08:45:06'),
(4, 'Empires', 'Great empires throughout history', '👑', '2026-04-02 08:45:06'),
(5, 'Wars', 'Major conflicts and battles', '⚔️', '2026-04-02 08:45:06'),
(6, 'Culture', 'Cultural movements and traditions', '🎭', '2026-04-02 08:45:06'),
(7, 'Science', 'Scientific discoveries and innovations', '🔬', '2026-04-02 08:45:06'),
(8, 'Sports', 'History of sports and athletics', '🏅', '2026-04-02 08:45:06');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `commentable_id` bigint(20) DEFAULT NULL,
  `commentable_type` varchar(30) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `author_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `user_id`, `commentable_id`, `commentable_type`, `content`, `created_at`, `author_name`) VALUES
(1, 3, 3, 'article', 'Excellent overview of Greek democracy! The comparison between Athenian direct democracy and modern representative systems is fascinating.', '2026-04-02 09:17:24', 'historian_jane'),
(2, 4, 3, 'article', 'I would add that women and slaves were excluded from Athenian democracy, which complicates the narrative significantly.', '2026-04-02 09:17:24', 'marco_polo'),
(3, 5, 6, 'article', 'The examination system was truly revolutionary. It created social mobility based on merit rather than birth.', '2026-04-02 09:17:24', 'cleopatra_fan'),
(4, 6, 6, 'article', 'Great article! Would love to see more about the Song Dynasty\'s technological innovations.', '2026-04-02 09:17:24', 'viking_scholar'),
(5, 3, 17, 'article', 'Da Vinci\'s notebooks are simply incredible. His anatomical drawings were centuries ahead of medical science.', '2026-04-02 09:17:24', 'historian_jane'),
(6, 4, 14, 'article', 'The House of Wisdom in Baghdad was perhaps the greatest center of learning in the medieval world.', '2026-04-02 09:17:24', 'marco_polo'),
(7, 5, 29, 'article', 'As a Vietnamese history enthusiast, I appreciate this comprehensive overview of our rich heritage.', '2026-04-02 09:17:24', 'cleopatra_fan'),
(8, 6, 15, 'article', 'Bushido is often romanticized but this article gives a balanced view of samurai culture.', '2026-04-02 09:17:24', 'viking_scholar'),
(9, 3, 10, 'article', 'The French Revolution\'s influence on modern democratic movements cannot be overstated.', '2026-04-02 09:17:24', 'historian_jane'),
(10, 4, 30, 'article', 'Rome\'s fall teaches us important lessons about imperial overreach and internal decay.', '2026-04-02 09:17:24', 'marco_polo'),
(11, 5, 2, 'article', 'The precision of Egyptian architecture still amazes modern engineers.', '2026-04-02 09:17:24', 'cleopatra_fan'),
(12, 6, 32, 'article', 'The Silk Road was truly the internet of the ancient world - connecting diverse civilizations.', '2026-04-02 09:17:24', 'viking_scholar'),
(13, 3, 34, 'article', 'From ancient Olympia to modern mega-events, the Olympics continue to unite nations through sport.', '2026-04-02 09:17:24', 'historian_jane'),
(14, 4, 13, 'article', 'Machu Picchu\'s engineering is remarkable considering it was built without iron tools or wheels.', '2026-04-02 09:17:24', 'marco_polo'),
(15, 5, 35, 'article', 'Football truly is the universal language. Great article on its global evolution!', '2026-04-02 09:17:24', 'cleopatra_fan');

-- --------------------------------------------------------

--
-- Table structure for table `edits`
--

CREATE TABLE `edits` (
  `id` bigint(20) NOT NULL,
  `editor_id` bigint(20) DEFAULT NULL,
  `editable_id` bigint(20) DEFAULT NULL,
  `editable_type` varchar(30) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `content` longtext DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `reviewed_by` bigint(20) DEFAULT NULL,
  `upvote_count` int(11) DEFAULT 0,
  `downvote_count` int(11) DEFAULT 0,
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `edits`
--

INSERT INTO `edits` (`id`, `editor_id`, `editable_id`, `editable_type`, `title`, `summary`, `content`, `thumbnail`, `status`, `reviewed_by`, `upvote_count`, `downvote_count`, `reviewed_at`, `created_at`) VALUES
(1, 3, 3, 'article', 'Ancient Greece: Democracy and Philosophy - Updated', 'Added section on women\'s roles in ancient Athens', 'Extended content about women in Athens...', NULL, 'approved', NULL, 0, 0, NULL, '2026-04-02 09:17:35'),
(2, 4, 6, 'article', 'Chinese Dynasties - Expanded Trade Section', 'More detail on Silk Road trade during Han Dynasty', 'Expanded content about Han trade routes...', NULL, 'approved', NULL, 0, 0, NULL, '2026-04-02 09:17:35'),
(3, 5, 14, 'article', 'Islamic Golden Age - Additional Scientists', 'Added information about Al-Biruni and other scholars', 'Content about Al-Biruni contributions...', NULL, 'pending', NULL, 0, 0, NULL, '2026-04-02 09:17:35'),
(4, 6, 29, 'article', 'Vietnamese History - Tran Dynasty Details', 'Expanded section on Tran Dynasty resistance to Mongol invasions', 'Detailed content about Mongol invasions...', NULL, 'pending', NULL, 0, 0, NULL, '2026-04-02 09:17:35'),
(5, 3, 17, 'article', 'Leonardo da Vinci - Engineering Works', 'Added details about engineering projects in Milan', 'Content about Milan canal system...', NULL, 'rejected', NULL, 0, 0, NULL, '2026-04-02 09:17:35'),
(6, 4, 32, 'article', 'Silk Road - Maritime Routes', 'Added section on maritime Silk Road routes', 'Content about maritime trade...', NULL, 'pending', NULL, 0, 0, NULL, '2026-04-02 09:17:35');

-- --------------------------------------------------------

--
-- Table structure for table `event_articles`
--

CREATE TABLE `event_articles` (
  `event_id` bigint(20) NOT NULL,
  `article_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event_topics`
--

CREATE TABLE `event_topics` (
  `event_id` bigint(20) NOT NULL,
  `topic_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exhibitions`
--

CREATE TABLE `exhibitions` (
  `id` bigint(20) NOT NULL,
  `created_by` bigint(20) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(300) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `view_count` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exhibitions`
--

INSERT INTO `exhibitions` (`id`, `created_by`, `title`, `slug`, `description`, `image_url`, `location`, `start_date`, `end_date`, `status`, `view_count`, `created_at`, `updated_at`) VALUES
(1, 1, 'Ancient Civilizations of the Mekong Delta', 'ancient-civilizations-mekong', 'An exhibition showcasing archaeological discoveries from the Mekong Delta region, including Oc Eo artifacts and Funan Kingdom relics.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Mekong_River.jpg/800px-Mekong_River.jpg', 'Vietnam National Museum of History, Hanoi', '2026-05-01', '2026-08-31', 'upcoming', 89, '2026-04-02 09:17:10', '2026-04-02 09:17:10'),
(2, 1, 'The Silk Road: Connecting Cultures', 'silk-road-connecting-cultures', 'A comprehensive exhibition tracing the cultural exchanges along the ancient Silk Road trade routes from China to Rome.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Silk_Road_in_the_I_century_AD_-_en.svg/800px-Silk_Road_in_the_I_century_AD_-_en.svg.png', 'British Museum, London', '2026-03-15', '2026-07-20', 'ongoing', 234, '2026-04-02 09:17:10', '2026-04-02 09:17:10'),
(3, 2, 'Medieval Manuscripts: Art of the Written Word', 'medieval-manuscripts', 'Featuring illuminated manuscripts from monasteries across Europe, showcasing the artistic and literary achievements of the medieval period.', NULL, 'Bodleian Library, Oxford', '2026-06-01', '2026-09-30', 'upcoming', 67, '2026-04-02 09:17:10', '2026-04-02 09:17:10'),
(4, 2, 'Bronze Age Southeast Asia', 'bronze-age-southeast-asia', 'Exploring the Dong Son and Ban Chiang cultures through their remarkable bronze artifacts and cultural legacy.', NULL, 'National Museum of Asian Art, Washington DC', '2025-10-01', '2026-02-28', 'past', 456, '2026-04-02 09:17:10', '2026-04-02 09:17:10');

-- --------------------------------------------------------

--
-- Table structure for table `exhibition_articles`
--

CREATE TABLE `exhibition_articles` (
  `exhibition_id` bigint(20) NOT NULL,
  `article_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `historical_events`
--

CREATE TABLE `historical_events` (
  `id` bigint(20) NOT NULL,
  `creator_id` bigint(20) DEFAULT NULL,
  `reviewed_by` bigint(20) DEFAULT NULL,
  `current_edit_id` bigint(20) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(300) DEFAULT NULL,
  `summary` text DEFAULT NULL,
  `event_year` int(11) DEFAULT NULL,
  `event_date` date DEFAULT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  `view_count` int(11) DEFAULT 0,
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `historical_events`
--

INSERT INTO `historical_events` (`id`, `creator_id`, `reviewed_by`, `current_edit_id`, `title`, `slug`, `summary`, `event_year`, `event_date`, `image_url`, `view_count`, `reviewed_at`, `created_at`) VALUES
(1, 1, NULL, NULL, 'Fall of the Western Roman Empire', 'fall-western-roman-empire', 'The deposition of the last Western Roman emperor Romulus Augustulus by the Germanic chieftain Odoacer.', 476, NULL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Colosseum_in_Rome-April_2007-1-_copie_2B.jpg/800px-Colosseum_in_Rome-April_2007-1-_copie_2B.jpg', 234, NULL, '2026-04-02 09:16:12'),
(2, 1, NULL, NULL, 'Signing of the Magna Carta', 'signing-magna-carta', 'King John seals the Magna Carta at Runnymede, establishing rule of law.', 1215, NULL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Magna_Carta_%28British_Library_Cotton_MS_Augustus_II.106%29.jpg/800px-Magna_Carta_%28British_Library_Cotton_MS_Augustus_II.106%29.jpg', 189, NULL, '2026-04-02 09:16:12'),
(3, 2, NULL, NULL, 'Fall of Constantinople', 'fall-of-constantinople', 'Ottoman Sultan Mehmed II captures Constantinople, ending the Byzantine Empire.', 1453, NULL, 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hagia_Sophia_Mars_2013.jpg/800px-Hagia_Sophia_Mars_2013.jpg', 312, NULL, '2026-04-02 09:16:12'),
(4, 1, NULL, NULL, 'Gutenberg Prints the Bible', 'gutenberg-prints-bible', 'Johannes Gutenberg completes the first printed Bible using movable type.', 1455, NULL, NULL, 156, NULL, '2026-04-02 09:16:12'),
(5, 2, NULL, NULL, 'Columbus Reaches the Americas', 'columbus-reaches-americas', 'Christopher Columbus makes landfall in the Bahamas, initiating European colonization.', 1492, NULL, NULL, 267, NULL, '2026-04-02 09:16:12'),
(6, 1, NULL, NULL, 'French Revolution Begins', 'french-revolution-begins', 'The storming of the Bastille marks the beginning of the French Revolution.', 1789, NULL, NULL, 345, NULL, '2026-04-02 09:16:12'),
(7, 2, NULL, NULL, 'Battle of Waterloo', 'battle-of-waterloo', 'Napoleon\'s final defeat by the Duke of Wellington and Prussian forces.', 1815, NULL, NULL, 198, NULL, '2026-04-02 09:16:12'),
(8, 1, NULL, NULL, 'World War I Begins', 'world-war-1-begins', 'The assassination of Archduke Franz Ferdinand triggers the Great War.', 1914, NULL, NULL, 278, NULL, '2026-04-02 09:16:12'),
(9, 2, NULL, NULL, 'World War II Ends', 'world-war-2-ends', 'Japan\'s surrender following the atomic bombings ends the deadliest conflict in history.', 1945, NULL, NULL, 456, NULL, '2026-04-02 09:16:12'),
(10, 1, NULL, NULL, 'Moon Landing', 'moon-landing', 'Apollo 11 astronaut Neil Armstrong becomes the first human to walk on the Moon.', 1969, NULL, NULL, 534, NULL, '2026-04-02 09:16:12');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `actor_id` bigint(20) DEFAULT NULL,
  `related_id` bigint(20) DEFAULT NULL,
  `related_type` varchar(30) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reading_list_items`
--

CREATE TABLE `reading_list_items` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `article_id` bigint(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`, `description`, `created_at`) VALUES
(1, 'Ceramics', 'Pottery and ceramic artifacts', '2026-04-02 08:45:06'),
(2, 'Trade', 'Commerce and trade routes', '2026-04-02 08:45:06'),
(3, 'Conservation', 'Preservation of historical sites', '2026-04-02 08:45:06'),
(4, 'Cartography', 'Historical maps and navigation', '2026-04-02 08:45:06'),
(5, 'Mythology', 'Myths and legends', '2026-04-02 08:45:06'),
(6, 'Engineering', 'Ancient engineering feats', '2026-04-02 08:45:06'),
(7, 'Religion', 'Religious history and practices', '2026-04-02 08:45:06'),
(8, 'Military', 'Military history and strategy', '2026-04-02 08:45:06'),
(9, 'Art', 'Visual arts and sculpture', '2026-04-02 08:45:06'),
(10, 'Literature', 'Historical writings and texts', '2026-04-02 08:45:06'),
(11, 'Agriculture', 'Farming and food production', '2026-04-02 08:45:06'),
(12, 'Navigation', 'Maritime exploration and seafaring', '2026-04-02 08:45:06');

-- --------------------------------------------------------

--
-- Table structure for table `topics`
--

CREATE TABLE `topics` (
  `id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(120) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `topics`
--

INSERT INTO `topics` (`id`, `name`, `slug`, `description`, `created_at`) VALUES
(1, 'Maritime Trade', 'maritime-trade', 'Sea-based commerce and trade networks', '2026-04-02 08:45:06'),
(2, 'Art & Objects', 'art-and-objects', 'Historical art, artifacts and cultural objects', '2026-04-02 08:45:06'),
(3, 'Wars & Conflicts', 'wars-and-conflicts', 'Major battles, wars and military campaigns', '2026-04-02 08:45:06'),
(4, 'Dynasties & Rulers', 'dynasties-and-rulers', 'Royal dynasties and notable rulers', '2026-04-02 08:45:06'),
(5, 'Philosophy & Thought', 'philosophy-and-thought', 'Philosophical movements and intellectual history', '2026-04-02 08:45:06'),
(6, 'Exploration & Discovery', 'exploration-and-discovery', 'Geographic exploration and scientific discovery', '2026-04-02 08:45:06');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `avatar_url` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','USER') NOT NULL,
  `is_locked` tinyint(1) DEFAULT 0,
  `bio` text DEFAULT NULL,
  `view_count` int(11) DEFAULT 0,
  `like_count` int(11) DEFAULT 0,
  `last_active_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password_hash`, `avatar_url`, `role`, `is_locked`, `bio`, `view_count`, `like_count`, `last_active_at`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'admin@globalhistory.org', '$2a$10$s.g4thyiSDlO.HdiLzCPvOOf.KXkT9e8EUSsx6Vegn5jx.9EhOvV6', NULL, 'ADMIN', 0, 'Platform administrator for Global History', 0, 0, NULL, '2026-04-02 08:56:50', '2026-04-02 08:56:50'),
(2, 'editor', 'editor@globalhistory.org', '$2a$10$xZslakELwqQQzdaz7iONUOXt3l3PehdXJ749wXqu1mTinPfy5Xvxy', NULL, 'ADMIN', 0, 'Senior editor and content curator', 0, 0, NULL, '2026-04-02 08:56:51', '2026-04-02 08:56:51'),
(3, 'historian_jane', 'jane@example.com', '$2a$10$G8yVLVPRXm7CqDyUVU132uZP9Sfmzto8zADnnyLKEo6R6kvlrSawS', NULL, 'USER', 0, 'History enthusiast specializing in Ancient civilizations', 0, 0, NULL, '2026-04-02 08:56:51', '2026-04-02 08:56:51'),
(4, 'marco_polo', 'marco@example.com', '$2a$10$I0/KT55FJU32zGnUf8TIs.PSps/OKJQ1AeDa5C9KUocOe.8L1y226', NULL, 'USER', 0, 'Travel historian and silk road researcher', 0, 0, NULL, '2026-04-02 08:56:51', '2026-04-02 08:56:51'),
(5, 'cleopatra_fan', 'cleo@example.com', '$2a$10$2o.KjiB49TbUp9YLWmommemDFsGAnUO78lfdFDXE.7GJyhQREllq6', NULL, 'USER', 0, 'Egyptian history researcher and writer', 0, 0, NULL, '2026-04-02 08:56:51', '2026-04-02 08:56:51'),
(6, 'viking_scholar', 'viking@example.com', '$2a$10$2bvMZ3XUxccoDzKuhD3J3etaVtuReffZmjL3tlBdpTieTsEowNx/O', NULL, 'USER', 0, 'Norse mythology and Viking Age specialist', 0, 0, NULL, '2026-04-02 08:56:51', '2026-04-02 08:56:51'),
(7, 'ming ming', 'ming@gmail.com', '$2a$10$zo5ZF2Y1y2bnPJEsCVoDguySYzQZYElHzec2zbv4ttYf1ypsz/FUy', NULL, 'USER', 0, NULL, 0, 0, NULL, '2026-04-02 10:10:01', '2026-04-02 10:10:01'),
(8, 'mingming', 'mingming@globalhistory.com', '$2a$10$DG3dg8rUT5XndZlr2CH/sOqmhLL5wUBl1eRPFgwIySgWunnorlMG.', NULL, 'USER', 0, NULL, 0, 0, NULL, '2026-04-02 10:29:37', '2026-04-02 10:29:37'),
(9, 'mingg', 'mingg@gmail.com', '$2a$10$U0CJdMT3xRuPLGl2KUXJqunaYdw2cFSezkhCbOp9Bp5hMvZjoY4Cq', NULL, 'USER', 0, NULL, 0, 0, NULL, '2026-04-02 10:48:46', '2026-04-02 10:48:46'),
(10, 'baby', 'baby@gmail.com', '$2a$10$5Z6xSieJHRSwQ/7Cte7pBOVrilhaubol3vRuST.7RYcFH6xd7vXy.', NULL, 'USER', 0, NULL, 0, 0, NULL, '2026-04-04 10:49:32', '2026-04-04 10:49:32');

-- --------------------------------------------------------

--
-- Table structure for table `votes`
--

CREATE TABLE `votes` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `votable_id` bigint(20) DEFAULT NULL,
  `votable_type` varchar(30) NOT NULL,
  `vote_type` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `author_id` (`author_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `article_tags`
--
ALTER TABLE `article_tags`
  ADD PRIMARY KEY (`article_id`,`tag_id`),
  ADD KEY `FKr17guaxramkeyxq0f1xn3bxbw` (`tag_id`);

--
-- Indexes for table `article_topics`
--
ALTER TABLE `article_topics`
  ADD PRIMARY KEY (`article_id`,`topic_id`),
  ADD KEY `topic_id` (`topic_id`);

--
-- Indexes for table `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `author_articles`
--
ALTER TABLE `author_articles`
  ADD PRIMARY KEY (`author_id`,`article_id`),
  ADD KEY `article_id` (`article_id`);

--
-- Indexes for table `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `edits`
--
ALTER TABLE `edits`
  ADD PRIMARY KEY (`id`),
  ADD KEY `editor_id` (`editor_id`),
  ADD KEY `reviewed_by` (`reviewed_by`);

--
-- Indexes for table `event_articles`
--
ALTER TABLE `event_articles`
  ADD PRIMARY KEY (`event_id`,`article_id`),
  ADD KEY `article_id` (`article_id`);

--
-- Indexes for table `event_topics`
--
ALTER TABLE `event_topics`
  ADD PRIMARY KEY (`event_id`,`topic_id`),
  ADD KEY `topic_id` (`topic_id`);

--
-- Indexes for table `exhibitions`
--
ALTER TABLE `exhibitions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `exhibition_articles`
--
ALTER TABLE `exhibition_articles`
  ADD PRIMARY KEY (`exhibition_id`,`article_id`),
  ADD KEY `article_id` (`article_id`);

--
-- Indexes for table `historical_events`
--
ALTER TABLE `historical_events`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `creator_id` (`creator_id`),
  ADD KEY `reviewed_by` (`reviewed_by`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `actor_id` (`actor_id`);

--
-- Indexes for table `reading_list_items`
--
ALTER TABLE `reading_list_items`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK9tfnha6opds7tsamutgmiwc6g` (`user_id`,`article_id`),
  ADD KEY `article_id` (`article_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `topics`
--
ALTER TABLE `topics`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `votes`
--
ALTER TABLE `votes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UKjeg3ht4vlmwkixkybwo4ofcp7` (`user_id`,`votable_id`,`votable_type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `articles`
--
ALTER TABLE `articles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `authors`
--
ALTER TABLE `authors`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `books`
--
ALTER TABLE `books`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `edits`
--
ALTER TABLE `edits`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `exhibitions`
--
ALTER TABLE `exhibitions`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `historical_events`
--
ALTER TABLE `historical_events`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reading_list_items`
--
ALTER TABLE `reading_list_items`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `topics`
--
ALTER TABLE `topics`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `votes`
--
ALTER TABLE `votes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `articles`
--
ALTER TABLE `articles`
  ADD CONSTRAINT `articles_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `articles_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `article_tags`
--
ALTER TABLE `article_tags`
  ADD CONSTRAINT `FKeoil73g36agokjw6vuklqgli3` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`),
  ADD CONSTRAINT `FKr17guaxramkeyxq0f1xn3bxbw` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`);

--
-- Constraints for table `article_topics`
--
ALTER TABLE `article_topics`
  ADD CONSTRAINT `article_topics_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `article_topics_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `author_articles`
--
ALTER TABLE `author_articles`
  ADD CONSTRAINT `author_articles_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `author_articles_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `books`
--
ALTER TABLE `books`
  ADD CONSTRAINT `books_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `edits`
--
ALTER TABLE `edits`
  ADD CONSTRAINT `edits_ibfk_1` FOREIGN KEY (`editor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `edits_ibfk_2` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `event_articles`
--
ALTER TABLE `event_articles`
  ADD CONSTRAINT `event_articles_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `historical_events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `event_articles_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `event_topics`
--
ALTER TABLE `event_topics`
  ADD CONSTRAINT `event_topics_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `historical_events` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `event_topics_ibfk_2` FOREIGN KEY (`topic_id`) REFERENCES `topics` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `exhibitions`
--
ALTER TABLE `exhibitions`
  ADD CONSTRAINT `exhibitions_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `exhibition_articles`
--
ALTER TABLE `exhibition_articles`
  ADD CONSTRAINT `exhibition_articles_ibfk_1` FOREIGN KEY (`exhibition_id`) REFERENCES `exhibitions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `exhibition_articles_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `historical_events`
--
ALTER TABLE `historical_events`
  ADD CONSTRAINT `historical_events_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `historical_events_ibfk_2` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`actor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reading_list_items`
--
ALTER TABLE `reading_list_items`
  ADD CONSTRAINT `reading_list_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reading_list_items_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `votes`
--
ALTER TABLE `votes`
  ADD CONSTRAINT `votes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
