import firebase from "firebase"

export const fetchPromos = () => {
    return new Promise((res,rej)=>{
        let promosArr = []
        firebase.firestore().collection('promotions').get().then(snapshot=>{
            if(snapshot.size){
                    snapshot.forEach(doc=>{
                        let promo = {
                            docid : doc.id,
                            data:doc.data()
                        }
                        promosArr.push(promo)
                    })
                    res(promosArr)
            }
            res(promosArr)
        }).catch(err=>{
            res([])
        })
    }) 
}