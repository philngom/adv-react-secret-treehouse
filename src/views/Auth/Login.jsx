import { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useForm } from '../../hooks/useForm';
import styles from './Login.css';

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const auth = useAuth();
  const { formState, handleFormChange } = useForm({ email: '', password: '' });
  const [error, setError] = useState(null);

  // The `from` property of `location.state` gives us
  // the URL to redirect to after logging in.
  const { from } = location.state || { from: { pathname: '/treehouse' } };

  const handleLogin = (event) => {

    // TODO: If login was unsuccessful, set an error with a message
    // to display to the user that their login failed.
    //
    // If login was successful, use the history hook
    // from React Router to replace the current URL with the URL
    // we need to redirect to.
    // See https://v5.reactrouter.com/web/api/history for the appropriate method to use
    try {
      event.preventDefault();
      console.log('inhere');
      const loginWasSuccessful = auth.login(formState.email, formState.password);
      console.log("🚀 ~ file: Login.jsx ~ line 31 ~ handleLogin ~ formState.email, formState.password", formState.email, formState.password)
      console.log("🚀 ~ file: Login.jsx ~ line 31 ~ handleLogin ~ loginWasSuccessful", loginWasSuccessful)

      history.replace(from);

    } catch (error) {
      setError('Login Failed. Try again.')
    }
  };

  return (
    <>
      <h3>You must log in to view the page at {from.pathname}</h3>
      <form onSubmit={(event) => handleLogin(event)} className={styles.loginForm} onChange={ handleFormChange }>
        <label>Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={ formState.email }
        />{' '}
        <label>Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={ formState.password }
        />
        <button type="submit" aria-label="Sign In">
          Sign in
        </button>
      </form>
      {error && <h4 className={styles.error}>{error}</h4>}
    </>
  );
}
