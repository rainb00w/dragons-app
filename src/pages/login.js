import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { authOperations } from '../redux/auth';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      <Container
        style={{ maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '60px' }}
      >
        <Card
          className="text-center border-0 mt-5 mb-4"
          style={{ maxWidth: '300px', marginLeft: 'auto', marginRight: 'auto' }}
        >
          <Card.Img
            variant="top"
            src="https://media.tenor.com/oUsqcKvpZLoAAAAM/dragon-tales-childhood-shows.gif"
          />
          <Card.Title className="mt-4">Find your dragon</Card.Title>
        </Card>

        <Tabs
          defaultActiveKey="login"
          id="uncontrolled-tab-example"
          className="mb-2"
          style={{
            maxWidth: '400px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Tab
            eventKey="login"
            title="Log In"
            style={{
              maxWidth: '300px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={({ email, password }, { setSubmitting }) => {
                dispatch(authOperations.logIn({ email, password }));
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .typeError('Will be a string')
                  .email()
                  .matches(
                    /^(([^<>()[\]\\.,;:\s@!?"]{2,}(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    'Is not in correct format'
                  )
                  .min(10)
                  .max(63)
                  .required('Required field'),
                password: Yup.string()
                  .typeError('Will be a string')
                  .min(5)
                  .max(30)
                  // .matches(/^[^<>()\[\]\\.,;:\s"]*/, 'Is not in correct format')
                  .required('Required field'),
              })}
            >
              {(formik, isSubmitting) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <Field
                      name="email"
                      className={
                        formik.touched.email && formik.errors.email
                          ? 'form-control is-invalid'
                          : 'form-control'
                      }
                      type="email"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      name="password"
                      className={
                        formik.touched.password && formik.errors.password
                          ? 'form-control is-invalid'
                          : 'form-control'
                      }
                      type="text"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="invalid-feedback">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-group text-center">
                    <button
                      type="submit"
                      className="btn btn-warning mt-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Please wait...' : 'Submit'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </Tab>
          <Tab
            eventKey="Register"
            title="Register"
            style={{
              maxWidth: '300px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <Formik
              initialValues={{ name: '', email: '', password: '' }}
              onSubmit={({ name, email, password }, actions) => {
                dispatch(
                  authOperations.register({
                    name,
                    email,
                    password,
                  })
                )
                  .then(answer => {
                    if (answer?.error?.message === 'Rejected') {
                      toast.warn(
                        'Please check your info! All fields should be unique',
                        {
                          position: toast.POSITION.TOP_CENTER,
                        }
                      );
                    }
                    if (answer?.meta.requestStatus === 'fulfilled') {
                      actions.resetForm({ name: '', email: '', password: '' });
                      toast.warn('Please check your email!', {
                        position: toast.POSITION.TOP_CENTER,
                      });
                      setTimeout(() => {
                        navigate('/');
                      }, 2000);
                    }
                  })
                  .catch(error => console.log('error', error));
              }}
              validationSchema={Yup.object().shape({
                name: Yup.string()
                  .typeError('Will be a string')
                  .min(3)
                  .max(100)
                  .required('Required field'),
                email: Yup.string()
                  .typeError('Will be a string')
                  .email()
                  .matches(
                    /^(([^<>()[\]\\.,;:\s@!?"]{2,}(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    'Is not in correct format'
                  )
                  .min(10)
                  .max(63)
                  .required('Required field'),
                password: Yup.string()
                  .typeError('Will be a string')
                  .min(5)
                  .max(30)
                  // .matches(/^[^<>()\[\]\\.,;:\s"]*/, 'Is not in correct format')
                  .required('Required field'),
              })}
            >
              {(formik, isSubmitting) => (
                <Form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <Field
                      name="name"
                      className={
                        formik.touched.name && formik.errors.name
                          ? 'form-control is-invalid'
                          : 'form-control'
                      }
                      type="text"
                    />
                    {formik.touched.name && formik.errors.name ? (
                      <div className="invalid-feedback">
                        {formik.errors.name}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <Field
                      name="email"
                      className={
                        formik.touched.email && formik.errors.email
                          ? 'form-control is-invalid'
                          : 'form-control'
                      }
                      type="email"
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <Field
                      name="password"
                      className={
                        formik.touched.password && formik.errors.password
                          ? 'form-control is-invalid'
                          : 'form-control'
                      }
                      type="text"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <div className="invalid-feedback">
                        {formik.errors.password}
                      </div>
                    ) : null}
                  </div>

                  <div className="form-group text-center">
                    <button
                      type="submit"
                      className="btn btn-warning mt-3"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Please wait...' : 'Submit'}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </Tab>
        </Tabs>
      </Container>
      <ToastContainer autoClose={1000} />
    </>
  );
};

export default LoginPage;
