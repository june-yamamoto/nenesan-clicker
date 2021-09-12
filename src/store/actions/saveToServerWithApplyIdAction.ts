import { addDoc, collection } from 'firebase/firestore';
import { Dispatch } from 'redux';
import { db } from '../../firebase';

export const saveToServerWithApplyIdAction = (saveDataState: any) => {
    return (dispatch: Dispatch<any>) => {
        return addDoc(collection(db, 'users'), { ...saveDataState }).then((docRef) => {
            dispatch({ type: 'APPLY_ID' , applyId: docRef.id });
            dispatch({ type: 'SAVE' });
        });
    };
};