
export default (comment) => {
    const divContentComment = document.createElement('p');
    divContentComment.innerHTML = `<p > ${comment.postComent}</p>`
    return divContentComment;
}