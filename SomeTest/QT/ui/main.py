from PyQt5.QtWidgets import QApplication, QDialog, QMessageBox
import sys

from PyQt5.uic.properties import QtGui

from QT.ui.test import Ui_Dialog


class window(QDialog, Ui_Dialog):  # 继承类
    def __init__(self):
        super().__init__()
        self.setupUi(self)  # 执行类中的setupUi函数
        self.pushButton.clicked.connect(self.hello)

    def hello(self, ):

        reply = QMessageBox.question(self, 'info',
                                     "你要确定退出吗？", QMessageBox.Yes |
                                     QMessageBox.No,
                                     QMessageBox.No)
        if reply == QMessageBox.Yes:
            print("退出")
            self.close()
        else:
            print("不退出")


if __name__ == '__main__':
    app = QApplication(sys.argv)
    w = window()
    w.show()
    sys.exit(app.exec_())
