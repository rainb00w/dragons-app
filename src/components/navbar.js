import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from '../redux/auth';
import Button from 'react-bootstrap/Button';
import { Navbar, Container } from 'react-bootstrap';
import { persistor } from '../redux/store';

const NavigationBar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);
  const name = useSelector(authSelectors.getUsername);

  return (
    <>
      {isLoggedIn && (
        <nav>
          <Navbar>
            <Container>
              <Navbar.Brand href="/">Hello, {name}</Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                  <Button
                    className="m-2"
                    variant="warning"
                    type="button"
                    onClick={() => {
                
                      persistor.purge();
                      return dispatch(authOperations.logOut());
                    }}
                  >
                    Выйти
                  </Button>
                </Navbar.Text>
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </nav>
      )}
    </>
  );
};

export default NavigationBar;
