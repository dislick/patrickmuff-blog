import React from 'react';
import styles from './link_collection_entry.module.css';
import { languageCodeToEmoji } from '../../utils/language_code_to_emoji/language_code_to_emoji';

export const LinkCollectionEntry = ({ title, language, description, url }) => (
  <li className={styles.root}>
    <a href={url}>{title}</a>
    {language && (
      <span className={styles.flag}>{languageCodeToEmoji(language)}</span>
    )}
    {description && <span className={styles.description}>{description}</span>}
  </li>
);
