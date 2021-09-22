import { collection, DocumentData, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { SaveDataType } from '../store/utils/makeSaveDataState';

/**
 * DB上のユーザー情報を取得するhooks
 */
export const useUsersRanking = (open: boolean) => {
    const [userData, setUserData] = useState<SaveDataType[]>([]);
    useEffect(() => {
        if (!open) return;

        getUserSaveData();
    }, [open]);

    const getUserSaveData = async () => {
        const saveDataArray: SaveDataType[] = [];
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            saveDataArray.push({
                id: data.id,
                name: data.name,
                currentNenesan: data.currentNenesan,
                clickedNenesanTimes: data.clickedNenesanTimes,
                maxNenesan: data.maxNenesan,
                totalNenesan: data.totalNenesan,
                totalPlayTime: data.totalPlayTime,
                maxClickCountPerSeconds: data.maxClickCountPerSeconds,
                totalClickDialogue: data.totalClickDialogue,
                totalClickDialogueArray: data.totalClickDialogueArray,
                buildItems: data.buildItems.map((buildItem: any) => {
                    return { id: buildItem.id, itemHas: buildItem.itemHas };
                }),
                upgradeItems: data.upgradeItems.map((upgradeItem: any) => {
                    return {
                        id: upgradeItem.id,
                        purchased: upgradeItem.purchased,
                    };
                }),
            });
        }, []);
        setUserData(saveDataArray);
    };

    return userData;
};
