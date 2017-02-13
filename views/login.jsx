const React = require('react');
const DefaultLayout = require('./layout/page');

class Login extends React.Component {
    render() {
        return (
            <DefaultLayout
                user={this.props.user}
                title="Регистрация и вход">
                <p>Введите имя пользователя и пароль. Если такого пользователя нет - он будет создан.</p>
                <form className="form-horizontal login-form" name="login-form">
                    <div className="form-group">
                        <label htmlFor="input-username" className="col-lg-2 control-label">Имя</label>
                        <div className="col-lg-10">
                            <input name="username" value="name" type="text" className="form-control" id="input-username"
                                   placeholder="Имя"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="input-password" className="col-lg-2 control-label">Пароль</label>
                        <div className="col-lg-10">
                            <input name="password" value="pass" type="password" className="form-control"
                                   id="input-password" placeholder="Пароль"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-lg-offset-2 col-lg-10">
                            <button type="submit" className="btn btn-primary" data-loading-text="Отправляю...">Войти
                            </button>
                            <span className="help-block error"> </span>
                        </div>
                    </div>
                </form>
                <script dangerouslySetInnerHTML={{
                    __html: `
                         $(document.forms['login-form']).on('submit', function() {
                                var form = $(this);
                                $('.error', form).html('');
                                $(":submit", form).button("loading");
                                $.ajax({
                                    url: "/login",
                                    method: "POST",
                                    data: form.serialize(),
                                    complete: function() {
                                        $(":submit", form).button("reset");
                                    },
                                    statusCode: {
                                        200: function() {
                                            form.html("Вы вошли в сайт").addClass('alert-success');
                                            window.location.href = "/chat";
                                        },
                                        403: function(jqXHR) {
                                            var error = JSON.parse(jqXHR.responseText);
                                            $('.error', form).html(error.message);
                                        }
                                    }
                                });
                                return false;
                            });
                    `
                }}/>
            </DefaultLayout>
        );
    }
}

module.exports = Login;