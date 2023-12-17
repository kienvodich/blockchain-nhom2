import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const HomePatient = () => {
  const [data, setData] = React.useState([]);
  useEffect(() => {
    const getUser = async () => {
      const refreshToken = localStorage.getItem('refreshToken')
      const response = await axios.post('http://localhost:5000/api/user/refreshtoken', { refreshToken: refreshToken })
      const res = await axios.get('http://localhost:5000/api/patient/', {
        headers: {
          Authorization: response.data.newAccessToken
        }
      });
      setData(res.data.users);
    };
    getUser();
  }, [data]);
  return (
    <>
      <div className='overflow-auto'>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th className='text-nowrap'>Name</th>
              <th className='text-nowrap'>Age</th>
              <th className='text-nowrap'>Phone</th>
              <th className='text-nowrap'>Address</th>
              <th className='text-nowrap'>Health Insurance Card Number</th>
              <th className='text-nowrap'>Diagnosis</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <td className='text-nowrap'>{item.name}</td>
                <td className='text-nowrap'>{item.age}</td>
                <td className='text-nowrap'>{item.phone}</td>
                <td className='text-nowrap'>{item.address}</td>
                <td className='text-nowrap'>{item.card}</td>
                <td className='text-nowrap'>{item.diagnosis}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default HomePatient;
