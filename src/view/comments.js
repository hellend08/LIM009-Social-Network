
export default (comments) => {
    const divContentComment = document.createElement('p');
    divContentComment.innerHTML = ` <p > ${comments.postComent}</p>`
    return divContentComment;
}