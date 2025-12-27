import { Form, Row, Col } from 'react-bootstrap';

export default ({ label, value, name, onChange, type = "text", readOnly = false, required = false }) => (
    <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="4">{label}</Form.Label>
        <Col sm="8">
            <Form.Control
                name={name}
                value={value ?? ""}
                onChange={onChange}
                type={type}
                plaintext={readOnly}
                readOnly={readOnly}
                required={required} />
        </Col>
    </Form.Group>
);