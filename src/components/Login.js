
import db from "../firebase";
import { auth, provider} from "../firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";
import "../styles/Login.scss";

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
    .signInWithPopup(provider)
    .then(result => {
      dispatch({
        type: actionTypes.SET_USER,
        payload: result.user
      });
      db.collection('users').doc(result.user.uid).get()
      .then((doc) => {
        if (!doc.exists) {
           return db.collection('users').doc(result.user.uid)
             .set({
                name: result.user.displayName,
                color: 'blue'
           });
        } else {
           return db.collection('users').onSnapshot(snapshot => (
              snapshot.docs
              .filter(doc => doc.data().name === result.user.displayName ?
              dispatch({
                type: actionTypes.SET_COLOR,
                payload: doc.data().color
              })
                : null
              )
           ))

        }
      })
      .then(() => {
        db.collection('users').onSnapshot(snapshot => (
          dispatch({
            type: actionTypes.SET_USERS_LIST,
            payload: ( snapshot.docs.map(doc => ({
              id: doc.id,
              name: doc.data().name
            })))
          })
        ))
      })

    })
    .catch(error => alert(error.message));
  }

  return (
    <div className="login__container">

        <div className="login__text">
          <h1>Sign in to Chat</h1>
        </div>

        <button type="submit" onClick={signIn} className="login__button">
          SignIn with Google
        </button>
      </div>
  )
}

export default Login
