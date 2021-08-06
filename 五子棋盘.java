package Homework;

public class 五子棋盘 {

    private static String[][] qipan = new String[15][15];

    public static void main(String[] args) {
        boolean flag = false;
        //调用方法，初始化棋盘
        qipan_chushi();
        //打印棋盘
        printboard();
        while (flag == false) {
            //用户下棋
            user_point();
            //电脑下棋
            computer_point();
            //打印下完的棋盘
            printboard();
            flag = winner2();

        }
    }

    /**
     * 棋盘初始化
     */
    public static void qipan_chushi() {
        for (int i = 0; i < qipan.length; i++) {
            for (int j = 0; j < qipan.length; j++) {
                qipan[i][j] = "╋";
            }
        }
    }

    /**
     * 打印棋盘
     */
    public static void printboard() {
        for (String[] strings : qipan) {
            for (String string : strings) {
                System.out.print(string);
            }
            System.out.println();
        }
    }

    /**
     * 用户下棋
     */
    public static void user_point() {
        String user = UtilScanner.getString("请输入下棋的位置（x，y）：");
        String[] user_pointArray = user.split(",");

        int x = Integer.parseInt(user_pointArray[0]);
        int y = Integer.parseInt(user_pointArray[1]);
        qipan[x - 1][y - 1] = "●";
    }

    /**
     * 电脑下棋
     */
    public static void computer_point() {
        while (true) {
            //生成随机0~15随机数表示电脑下的棋子
            int computerSeletct_x = (int) (Math.random() * 15);
            int computerSeletct_y = (int) (Math.random() * 15);
            //如果生成随机数是╋，则赋值，不是说明该位置已经下过
            if (qipan[computerSeletct_x][computerSeletct_y].equals("╋")) {
                qipan[computerSeletct_x][computerSeletct_y] = "○";
                break;
            }
        }
    }

    /**
     * 输赢规则
     *
     * @param i
     * @param j
     * @return
     */
    public static boolean winner1(int i, int j) {
        boolean flag = false;
        if (i - 5 >= -1) {

            String str = qipan[i][j] + qipan[i - 1][j] + qipan[i - 2][j] + qipan[i - 3][j] + qipan[i - 4][j];
            if (str.equals("●●●●●")) {
                System.out.println("你赢了");
                flag = true;
            } else if (str.equals("○○○○○")) {
                System.out.println("你输了");
                flag = true;
            }
        }

        if (i + 5 <= 15) {
            String str = qipan[i][j] + qipan[i + 1][j] + qipan[i + 2][j] + qipan[i + 3][j] + qipan[i + 4][j];
            if (str.equals("●●●●●")) {
                System.out.println("你赢了");
                flag = true;
            } else if (str.equals("○○○○○")) {
                System.out.println("你输了");
                flag = true;
            }
        }

        if (j - 5 >= -1) {

            String str = qipan[i][j] + qipan[i][j - 1] + qipan[i][j - 2] + qipan[i][j - 3] + qipan[i][j - 4];
            if (str.equals("●●●●●")) {
                System.out.println("你赢了");
                flag = true;
            } else if (str.equals("○○○○○")) {
                System.out.println("你输了");
                flag = true;
            }
        }

        if (j + 5 <= 15) {
            String str = qipan[i][j] + qipan[i][j + 1] + qipan[i][j + 1] + qipan[i][j + 3] + qipan[i][j + 4];
            if (str.equals("●●●●●")) {
                System.out.println("你赢了");
                flag = true;
            } else if (str.equals("○○○○○")) {
                System.out.println("你输了");
                flag = true;
            }
        }

        if (j - 5 >= -1 & i - 5 >= -1) {

            String str = qipan[i][j] + qipan[i - 1][j - 1] + qipan[i - 2][j - 2] + qipan[i - 3][j - 3] + qipan[i - 4][j - 4];
            if (str.equals("●●●●●")) {
                System.out.println("你赢了");
                flag = true;
            } else if (str.equals("○○○○○")) {
                System.out.println("你输了");
                flag = true;
            }
        }

        if (j + 5 <= 15 & i - 5 >= -1) {
            String str = qipan[i][j] + qipan[i - 1][j + 1] + qipan[i - 2][j + 2] + qipan[i - 3][j + 3] + qipan[i - 4][j + 4];
            if (str.equals("●●●●●")) {
                System.out.println("你赢了");
                flag = true;
            } else if (str.equals("○○○○○")) {
                System.out.println("你输了");
                flag = true;
            }
        }
        return flag;
    }

    /**
     * 遍历判断棋盘是否有满足的情况
     *
     * @return
     */
    public static boolean winner2() {
        boolean flag = false;
        for (int i = 0; i < qipan.length; i++) {
            for (int j = 0; j < qipan[i].length; j++) {
                flag = winner1(i, j);
                if (flag) {
                    return flag;
                }
            }
        }
        return flag;
    }
}

