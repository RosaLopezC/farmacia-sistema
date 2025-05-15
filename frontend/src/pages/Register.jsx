import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export default function Register() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/roles');
        setRoles(response.data);
      } catch (error) {
        console.error('Error cargando roles:', error);
      }
    };
    fetchRoles();
  }, []);

  return (
    <div className="container register-container">
      <h2>Registro de Usuario</h2>
      <Formik
        initialValues={{
          username: '',
          email: '',
          password: '',
          roleId: '' // Nuevo campo para el rol
        }}
        validationSchema={Yup.object({
          username: Yup.string().required('Usuario requerido'),
          email: Yup.string().email('Email inválido').required('Email requerido'),
          password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Contraseña requerida'),
          roleId: Yup.string().required('Seleccione un rol')
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await axios.post('http://localhost:3000/api/auth/signup', {
              username: values.username,
              email: values.email,
              password: values.password,
              roles: [roles.find(role => role.id === parseInt(values.roleId)).name] // Convertimos roleId a nombre del rol
            });
            console.log('Registro exitoso:', response.data);
            navigate('/login');
          } catch (error) {
            console.error('Error en registro:', error.response?.data?.message || 'Error desconocido');
            alert(error.response?.data?.message || 'Error en el registro');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        <Form className="form-group">
          <label>Username</label>
          <Field name="username" className="form-control" />
          <ErrorMessage name="username" component="div" className="text-danger" />

          <label className="mt-3">Email</label>
          <Field name="email" type="email" className="form-control" />
          <ErrorMessage name="email" component="div" className="text-danger" />

          <label className="mt-3">Password</label>
          <Field name="password" type="password" className="form-control" />
          <ErrorMessage name="password" component="div" className="text-danger" />

          {/* Selector de rol */}
          <div className="mb-3">
            <label htmlFor="roleId">Rol</label>
            <Field 
              as="select" 
              name="roleId" 
              className="form-select"
            >
              <option value="">Seleccione un rol</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>
                  {role.name.toUpperCase()}
                </option>
              ))}
            </Field>
            <ErrorMessage name="roleId" component="div" className="text-danger" />
          </div>

          <button type="submit" className="btn btn-primary">
            Registrar
          </button>
        </Form>
      </Formik>
    </div>
  );
}