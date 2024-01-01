import IArticles from "../../Models/IArticles"

interface Prop {
    ArticleSel: IArticles
}

export default function EditArticle({ArticleSel}: Prop){
    return<>
        <h1>{ArticleSel.ar_brand}</h1>
    </>
}