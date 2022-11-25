export const RenderIndividualInfo = (preState, state, postState) => {
    return (
      <div className="row">
        <div className="col view-individual-log-main">
          {preState}{state}{postState}
        </div>
    </div>
    )
}