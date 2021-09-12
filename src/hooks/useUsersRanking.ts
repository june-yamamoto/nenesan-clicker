import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';

/**
 * DB上のユーザー情報を取得するhooks
 */
export const useUsersRanking = (open: boolean) => {
    const [userData, setUserData] = useState<any>([]);
    useEffect(() => {
        if (!open) return;

        getUserSaveData();
    }, [open]);

    const getUserSaveData = async () => {
        const saveDataArray: DocumentData[] = [];
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            saveDataArray.push(doc.data());
        }, []);
        setUserData(saveDataArray)
    }

    return userData;
};
