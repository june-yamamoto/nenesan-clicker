import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';
import { db } from '../firebase';

/**
 * DB上のユーザー情報を取得するhooks
 */
export const useUsersRanking = () => {
    useEffect(() => {
        const col = collection(db, 'users');

        const unsubscribe = onSnapshot(col, {
            next: (sn) => {
                console.log(sn.docs.map((docSn) => docSn.data()));
            },
        });
        return unsubscribe;
    });
};
