import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <p>Items per page</p>
            <form>
                <select className={styles.select}>
                    <option>10</option>
                    <option selected="selected">20</option>
                    <option>50</option>
                    <option>100</option>
                </select>
            </form>
        </div>
    );
};

export default Footer;
