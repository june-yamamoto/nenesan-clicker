import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export const saveToServerAction = (saveDataState: any) => {
    return (dispatch: any) => {
        return setDoc(doc(db, `users/${saveDataState.id}`), { ...saveDataState }).then(() => {
            dispatch({ type: 'SAVE' });
        });
    };
};
