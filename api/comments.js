import firebase from "firebase"

export const fetchComments = () => {
    return new Promise((res,rej)=>{
        let commentsArr = []
        firebase.firestore().collection('comments').get().then(snapshot=>{
            if(snapshot.size){
                    snapshot.forEach(doc=>{
                        let comment = {
                            docid : doc.id,
                            data:doc.data()
                        }
                        commentsArr.push(comment)
                    })
                    res(commentsArr)
            }
            res(commentsArr)
        }).catch(err=>{
            res([])
        })
    }) 
}