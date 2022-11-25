import { firebase_db } from "../../../firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

const getChatsStatsFromFirestore = async () => {
    try {
        const sixmonths_before = new Date();
        sixmonths_before.setMonth(sixmonths_before.getMonth() - 6);
        sixmonths_before.setDate(1);
        const q = query(collection(firebase_db, "userChats"));

        const querySnapshot = await getDocs(q);
        const result = {};
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            Object.values(doc.data()).forEach((user_chat) => {
                const lastmessageDate = user_chat.date.toDate();
                if (lastmessageDate > sixmonths_before) {
                    const month = lastmessageDate.getMonth();
                    result[month] ? result[month]++ : (result[month] = 1);
                }
            });
        });
        return result;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export default getChatsStatsFromFirestore;