import PasswordValidator from 'password-validator';

export function checkMail(req, res, next) {
    const regex =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const checkRegex = req.body.email.match(regex);
    if (checkRegex !== null) {
        next();
    } else {
        res.status(409).send('Please enter a valid E-Mail');
    }
}

export function checkPassword(req, res, next) {
    const schema = new PasswordValidator();
    // prettier-ignore
    schema
        .is().min(8)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().symbols();
    if (schema.validate(req.body.password)) {
        next();
    } else {
        res.status(409).send(
            'The Password needs to be at least 8 characters with one uppercase, one lowercase, one digit and one symbol '
        );
    }
}
export default {
    checkMail,
    checkPassword
}
