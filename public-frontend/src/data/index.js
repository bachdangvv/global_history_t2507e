import { countries } from './countries';
import { eras } from './eras';
import { topics } from './topics';
import { articles } from './articles';
import { events } from './events';

export const db = { countries, eras, topics, articles, events };

export const getArticleBySlug = (slug) => articles.find(a => a.slug === slug);
export const getEventBySlug = (slug) => events.find(e => e.slug === slug);
export const getArticlesByEra = (eraId) => articles.filter(a => a.era_id === eraId);
export const getEventsByCountry = (countryId) => events.filter(e => e.country_id === countryId);
export const getSortedEvents = () => [...events].sort((a, b) => a.event_year - b.event_year);