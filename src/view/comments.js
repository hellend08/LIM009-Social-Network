
export default (comment) => {
    const divContentComment = document.createElement('p');
    divContentComment.innerHTML = `
    <section>
      <p class="comment"> ${comment.postComent}</p>
    </section>`
    return divContentComment;
}