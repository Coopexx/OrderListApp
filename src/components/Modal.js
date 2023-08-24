import React from 'react';
import styles from './Modal.module.css';

const Modal = (props) => {
    const removeModalHandler = () => {
        props.modal(false);
    };

    const formSubmitHandler = (event) => {
        event.preventDefault();
        if (
            event.target[1].value.length > 0 &&
            event.target[2].value.length > 0
        ) {
            props.deliveredNotes([
                event.target[0].value,
                event.target[1].value,
                event.target[2].value,
                new Date(),
            ]);
            props.modal(false);
        }
    };

    return (
        <React.Fragment>
            <div
                className={styles.background}
                onClick={removeModalHandler}
            ></div>

            <div className={styles.window}>
                <svg
                    className={styles.cross}
                    onClick={removeModalHandler}
                    fill="#000000"
                    viewBox="0 0 32 32"
                >
                    <g id="SVGRepo_iconCarrier">
                        <path d="M31.708 25.708c-0-0-0-0-0-0l-9.708-9.708 9.708-9.708c0-0 0-0 0-0 0.105-0.105 0.18-0.227 0.229-0.357 0.133-0.356 0.057-0.771-0.229-1.057l-4.586-4.586c-0.286-0.286-0.702-0.361-1.057-0.229-0.13 0.048-0.252 0.124-0.357 0.228 0 0-0 0-0 0l-9.708 9.708-9.708-9.708c-0-0-0-0-0-0-0.105-0.104-0.227-0.18-0.357-0.228-0.356-0.133-0.771-0.057-1.057 0.229l-4.586 4.586c-0.286 0.286-0.361 0.702-0.229 1.057 0.049 0.13 0.124 0.252 0.229 0.357 0 0 0 0 0 0l9.708 9.708-9.708 9.708c-0 0-0 0-0 0-0.104 0.105-0.18 0.227-0.229 0.357-0.133 0.355-0.057 0.771 0.229 1.057l4.586 4.586c0.286 0.286 0.702 0.361 1.057 0.229 0.13-0.049 0.252-0.124 0.357-0.229 0-0 0-0 0-0l9.708-9.708 9.708 9.708c0 0 0 0 0 0 0.105 0.105 0.227 0.18 0.357 0.229 0.356 0.133 0.771 0.057 1.057-0.229l4.586-4.586c0.286-0.286 0.362-0.702 0.229-1.057-0.049-0.13-0.124-0.252-0.229-0.357z"></path>
                    </g>
                </svg>
                <form className={styles.textfield} onSubmit={formSubmitHandler}>
                    <p>Where is the item stored?</p>
                    <select className={`${styles.dropdown} ${styles.default}`} title='RT = Room Temperature'>
                        <option selected="selected">RT</option>
                        <option>4°C</option>
                        <option>-20°C</option>
                        <option>-80°C</option>
                    </select>
                    <p>Your initials</p>
                    <input
                        placeholder="HT"
                        className={`${styles.initals} ${styles.default}`}
                        maxlength="3"
                    ></input>
                    <p>Comment</p>
                    <textarea
                        placeholder="Detailed storage location, color of box, important notes, etc."
                        cols="40"
                        rows="4"
                        maxlength="100"
                        className={`${styles.comment} ${styles.default}`}
                    ></textarea>
                    <button className={styles.buttonSubmit} type="submit">
                        Submit
                    </button>
                </form>
            </div>
        </React.Fragment>
    );
};

export default Modal;
