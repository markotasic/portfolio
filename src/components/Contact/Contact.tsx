import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRef } from 'react';
import useInput from '../../hooks/use-input';
import emailjs from 'emailjs-com';
import classes from './Contact.module.scss';

const isNotEmpty = (value: string) => value.trim() !== '';
const isEmail = (value: string) => value.includes('@') && value.includes('.');

toast.configure();

interface ContactProps {
  onClose: () => void;
}

const Contact = ({ onClose }: ContactProps) => {
  const form = useRef<null | HTMLFormElement>(null);

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputIsInvalid,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: resetNameInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredMail,
    isValid: enteredMailIsValid,
    hasError: mailInputIsInvalid,
    valueChangeHandler: mailInputChangeHandler,
    inputBlurHandler: mailInputBlurHandler,
    reset: resetMailInput,
  } = useInput(isEmail);

  const {
    value: enteredSubject,
    isValid: enteredSubjectIsValid,
    hasError: subjectInputIsInvalid,
    valueChangeHandler: subjectInputChangeHandler,
    inputBlurHandler: subjectInputBlurHandler,
    reset: resetSubjectInput,
  } = useInput(isNotEmpty);

  const {
    value: enteredMessage,
    isValid: enteredMessageIsValid,
    hasError: messageInputIsInvalid,
    valueChangeHandler: messageInputChangeHandler,
    inputBlurHandler: messageInputBlurHandler,
    reset: resetMessageInput,
  } = useInput(isNotEmpty);

  const formSubmissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    nameInputBlurHandler();
    mailInputBlurHandler();
    subjectInputBlurHandler();
    messageInputBlurHandler();

    if (
      !enteredNameIsValid ||
      !enteredMailIsValid ||
      !enteredSubjectIsValid ||
      !enteredMessageIsValid
    )
      return;

    if (!form.current) return;

    const id = toast.loading('Sending...', {
      position: toast.POSITION.TOP_CENTER,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      hideProgressBar: true,
    });

    console.log(form.current);
    emailjs
      .sendForm(
        'service_p2rj43o',
        'template_tni32te',
        form.current,
        'user_yxlB9jsBIB4hr8akK898b'
      )
      .then(
        (resolve) => {
          resetNameInput();
          resetMailInput();
          resetSubjectInput();
          resetMessageInput();

          toast.update(id, {
            render: 'Mail successfully sent!',
            type: 'success',
            isLoading: false,
            autoClose: 3000,
          });
        },
        (error) => {
          toast.update(id, {
            render: 'An error occurred!',
            type: 'error',
            isLoading: false,
            autoClose: 3000,
          });
        }
      );
  };

  const nameInputClasses = nameInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  const mailInputClasses = mailInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  const subjectInputClasses = subjectInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  const messageInputClasses = messageInputIsInvalid
    ? 'form-control invalid'
    : 'form-control';

  return (
    <div className={classes.contact}>
      <h2>Let's talk!</h2>

      <div className={classes.cross} onClick={onClose}></div>

      <h3>New projects, freelance or even a job.</h3>
      <form ref={form} onSubmit={formSubmissionHandler}>
        <div className={nameInputClasses}>
          <input
            type='text'
            name='name'
            placeholder='name'
            onChange={nameInputChangeHandler}
            onBlur={nameInputBlurHandler}
            value={enteredName}
          />
          {nameInputIsInvalid && <p>Name must not be empty.</p>}
        </div>
        <div className={mailInputClasses}>
          <input
            type='email'
            name='email'
            placeholder='yourmail@gmail.com'
            onChange={mailInputChangeHandler}
            onBlur={mailInputBlurHandler}
            value={enteredMail}
          />
          {mailInputIsInvalid && <p>Please enter a valid format! (@, .)</p>}
        </div>
        <div className={subjectInputClasses}>
          <input
            type='text'
            name='subject'
            placeholder='subject'
            onChange={subjectInputChangeHandler}
            onBlur={subjectInputBlurHandler}
            value={enteredSubject}
          />
          {subjectInputIsInvalid && <p>Subject must not be empty.</p>}
        </div>
        <div className={messageInputClasses}>
          <textarea
            name='message'
            placeholder='message'
            onChange={messageInputChangeHandler}
            onBlur={messageInputBlurHandler}
            value={enteredMessage}
          />
          {messageInputIsInvalid && <p>Message must not be empty.</p>}
        </div>
        <button className='hover-btn-animation' type='submit'>
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};

export default Contact;
