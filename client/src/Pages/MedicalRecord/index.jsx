import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

import classNames from 'classnames/bind';
import styles from './MedicalRecord.module.scss';

const cx = classNames.bind(styles);

const MedicalRecord = () => {
  const [data, setData] = useState([]);
  const [userLoad, setUserLoad] = useState([]);
  const [profile, setProfile] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    const getUser = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post(
        'http://localhost:5000/api/user/refreshtoken',
        { refreshToken: refreshToken }
      );
      const res = await axios.get('http://localhost:5000/api/patient/', {
        headers: {
          Authorization: response.data.newAccessToken,
        },
      });
      setData(res.data.users);
    };
    getUser();

    const getOneUser = async () => {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await axios.post(
        'http://localhost:5000/api/user/refreshtoken',
        { refreshToken: refreshToken }
      );
      const res = await axios.get('http://localhost:5000/api/user/current', {
        headers: {
          Authorization: response.data.newAccessToken,
        },
      });
      setUserLoad(res.data.rs);
    };
    getOneUser();
  }, []);

  useEffect(() => {
    const dataProfile = data.filter(item => item.phone === userLoad.phone);
    setProfile(dataProfile);
  }, [data, userLoad]);

  return (
    <div
      style={{
        margin: '0 10px',
      }}
    >
      <h1
        style={{
          textAlign: 'center',
          color: '#000',
          marginTop: '50px',
          fontSize: '30px',
        }}
      >
        The Patient's Medical Records
      </h1>
      <div className={cx('search')}>
        <input
          type="text"
          placeholder="Search by phone ..."
          style={{ width: '30%' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Health Insurance Card Number</th>
            <th>Diagnosis</th>
          </tr>
        </thead>
        <tbody>
          {profile?.filter((user) => user.phone.includes(search)).map((item, index) => (
            <tr key={index}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.phone}</td>
              <td>{item.address}</td>
              <td>{item.card}</td>
              <td>{item.diagnosis}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MedicalRecord;
