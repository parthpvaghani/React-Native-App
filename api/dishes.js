import firebase from "firebase"

export const fetchDishes = () => {
    return new Promise((res,rej)=>{
        let dishesArr = []
        firebase.firestore().collection('dishes').get().then(snapshot=>{
            if(snapshot.size){
                    snapshot.forEach(doc=>{
                        let dish = {
                            docid : doc.id,
                            data:doc.data()
                        }
                        dishesArr.push(dish)
                    })
                    res(dishesArr)
            }
            res(dishesArr)
        }).catch(err=>{
            res([])
        })
    }) 
}

export const deleteFavoriteDish = (id) => {
        firebase.firestore().collection('dishes').doc(id).update({
            favorite:false
        })
}


export const addFavoriteDish = (id) => {
    firebase.firestore().collection('dishes').doc(id).update({
        favorite:true
    })
}