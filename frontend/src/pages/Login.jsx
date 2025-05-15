import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return (
    <div className="container login-container">
      <h2 className="mb-4">Login</h2>
      <Formik
        initialValues={{ username: '', password: '' }}
        validationSchema={Yup.object({
          username: Yup.string().required('Requerido'),
          password: Yup.string().required('Requerido'),
        })}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const data = await login(values);
            setUser(data);

            // Redirigir a la página intentada o al dashboard según el rol
            const from = location.state?.from?.pathname || '/';
            navigate(from);
          } catch (error) {
            setErrors({ username: 'Credenciales inválidas' });
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="form-group">
          <label>Username</label>
          <Field name="username" type="text" className="form-control" />
          <ErrorMessage name="username" component="div" className="text-danger" />

          <label className="mt-3">Password</label>
          <Field name="password" type="password" className="form-control" />
          <ErrorMessage name="password" component="div" className="text-danger" />

          <button type="submit" className="btn btn-primary mt-4">Ingresar</button>
        </Form>
      </Formik>
    </div>
  );
}