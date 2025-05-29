import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../../api/userApi';
import type { User } from '../../types';
import styles from './UsersPage.module.css';

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (isLoading) {
    return <div className={styles.loading}>Loading users...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Family Members</h1>
      <div className={styles.userGrid}>
        {users.map((user) => (
          <Link to={`/users/${user.id}/albums`} key={user.id} className={styles.userCard}>
            <h2 className={styles.userName}>{user.name}</h2>
            <p className={styles.userEmail}>{user.email}</p>
            <p className={styles.userPhone}>{user.phone}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
