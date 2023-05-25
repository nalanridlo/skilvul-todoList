
import { PropTypes } from 'prop-types';

function TodoLayout({text}) {
  return (
        <>
            <div className="container py-3">
                <h3 className="text-center fw-bold">{text}</h3>
            </div>
        </>
  );
}

TodoLayout.propTypes = {
    text: PropTypes.string,
}

export default TodoLayout