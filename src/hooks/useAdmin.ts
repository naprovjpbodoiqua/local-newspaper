'use client';
import { useState, useEffect } from 'react';

const ADMIN_URL_KEY = 'local_admin_2026';
const ADMIN_PIN = '69420';

export function useAdmin() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const secret = params.get('secret_admin');

    if (secret === ADMIN_URL_KEY) {
      localStorage.setItem('is_local_admin', 'true');
      setIsAdmin(true);
    } else {
      setIsAdmin(localStorage.getItem('is_local_admin') === 'true');
    }
  }, []);

  const activateWithPin = (pin: string): boolean => {
    if (pin === ADMIN_PIN) {
      localStorage.setItem('is_local_admin', 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const deactivateAdmin = () => {
    localStorage.removeItem('is_local_admin');
    setIsAdmin(false);
  };

  return { isAdmin: mounted ? isAdmin : false, activateWithPin, deactivateAdmin };
}