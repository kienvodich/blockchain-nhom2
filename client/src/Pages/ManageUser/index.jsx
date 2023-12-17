import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';

import classNames from 'classnames/bind';
import styles from './ManageUser.module.scss';

const cx = classNames.bind(styles);

const ManageUser = () => {
  const [user, setUser] = React.useState([]);
  const [search, setSearch] = React.useState('');
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
      setUser(newRes);
    };
    getUser();
  }, []);

  const handleDelete = async (_id, name) => {
    if (window.confirm(`Are you sure you want to delete user ${name} ?`)) {
      const refreshToken = localStorage.getItem('refreshToken')
      const response = await axios.post('http://localhost:5000/api/user/refreshtoken', { refreshToken: refreshToken })
      try {
        const result = await axios.delete(`http://localhost:5000/api/user/?_id=${_id}`, {
          headers: {
            Authorization: response.data.newAccessToken
          }
        });
        if (result.status === 200) {
          setUser(Array.from(user).filter((x) => x._id !== _id));
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while deleting the user.');
      }
    } else {
      return;
    }
  };

  return (
    <>
      <div className={cx('search')}>
        <input
          type="text"
          placeholder="Search by name ..."
          style={{ width: '300px' }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className='overflow-auto'>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>{item.role}</td>
                <td className={cx('button')}>
                  <button
                    className={cx('btn')}
                    style={{
                      backgroundColor: 'red',
                      padding: '5px 10px',
                    }}
                    onClick={() => {
                      handleDelete(item._id, item.name);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ManageUser;
