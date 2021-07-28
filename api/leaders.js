import firebase from "firebase"

export const fetchLeaders = () => {
    return new Promise((res,rej)=>{
        let leadersArr = []
        firebase.firestore().collection('leaders').get().then(snapshot=>{
            if(snapshot.size){
                    snapshot.forEach(doc=>{
                        let leader = {
                            docid : doc.id,
                            data:doc.data()
                        }
                        leadersArr.push(leader)
                    })
                    res(leadersArr)
            }
            res(leadersArr)
        }).catch(err=>{
            res([])
        })
    }) 
}