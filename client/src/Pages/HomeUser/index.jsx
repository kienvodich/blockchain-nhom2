import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

// const cx = classNames.bind(styles);
const HomeUser = () => {
  const [data, setData] = React.useState();
  useEffect(() => {
    const getUser = async () => {
      const refreshToken = localStorage.getItem('refreshToken')
      const response = await axios.post('http://localhost:5000/api/user/refreshtoken', { refreshToken: refreshToken })
      const res = await axios.get('http://localhost:5000/api/user/', {
        headers: {
          Authorization: response.data.newAccessToken
        }
      });
      const newRes = res.data.users.filter(item => item.role !== 'admin')
      setData(newRes);
    };
    getUser();
  }, [data]);
  return (
    <>
      <div className='overflow-auto'>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default HomeUser;
