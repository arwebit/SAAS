export class API_LINKS {
  // public static BASE_URL: string = 'http://localhost/saasexpresstimes/api';

  public static BASE_URL: string = 'https://saasexpresstimes.com/server/api';

  public static LOGIN_URL: string = this.BASE_URL + '/user/login';

  /******************************* EXTRA APIS *******************************/

  public static USERS_URL: string = this.BASE_URL + '/users';
  public static PASS_CHANGE_URL: string = this.BASE_URL + '/user/changepass';

  /******************************* EXTRA APIS *******************************/

  public static CATEGORY_URL: string = this.BASE_URL + '/categories';
  public static BLOG_URL: string = this.BASE_URL + '/blogs';
  public static BLOG_PIC_URL: string = this.BASE_URL + '/blogs/change_pic';
}
