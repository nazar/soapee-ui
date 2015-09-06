# Development Setup

## Virtual Development using Vagrant

[Vagrant](https://www.vagrantup.com) provides easy to configure, reproducible, and portable work environments built on top of
industry-standard technology and controlled by a single consistent workflow to help maximize the productivity and flexibility of you and your team.

## Setting up Vagrant

### 1. Download and Install Vagrant

Head to the Vagrant [downloads](http://www.vagrantup.com/downloads) and download the correct installation package for your OS

### 2. Download and Install VirtualBox

The project [Vagrantfile](../Vagrantfile) is configured for VirtualBox, which can be [downloaded here](https://www.virtualbox.org/wiki/Downloads).
Please ensure that the Host Only network option is selected during VirtualBox installation.

### 3. Download a Vagrant Base Box

Install the local base box using the following command:

```
vagrant box add bento/debian-7.8-i386
```

When asked, choose the virtualbox variant.

### 4. Provision the Local Development VM

Once **bento/debian-7.8-i386** has been downloaded open a command prompt at the project folder root and issue the following command:

```
vagrant up
```

This should clone the base box into a project specific box. The Vagrant file should also provision all pre-requisites (i.e. node, npm, build tools etc). Once complete, the box should be
accessible on address **192.168.30.20**. [PuTTY](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) or [SmarTTY](http://smartty.sysprogs.com/)
can be used to SSH into 192.168.30.20 using the username/password of vagrant/vagrant.

### 5. Setup File Synchronization

Vagrant allows using your favourite IDE/Text Editor on your OS. These files are then synced on the Vagrant box, which is configured to build and
serve the web application. During development, for example, the web application is accessible on http://192.168.30.20:8080.

Vagrant VMs are almost perfect apart from the default Shared Folder mechanism. In VirtualBox, the vboxfs shared folder has a number of shortcomings:

#### Lacks symbolic link support

This can be hacked using:

```
  config.vm.provider "virtualbox" do |vb|
      vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/vagrant", "1"]
  end
```

Additionally, if using Windows, the non Admin user must be provided with [create symbolic link permissions](http://superuser.com/questions/124679/how-do-i-create-a-link-in-windows-7-home-premium-as-a-regular-user?answertab=votes#125981).

The above "works" but is less than ideal

#### Does not expose file changes

This is a critical issue as LiveReload or WebPack's Hot Reload never detects file changes. Any files in the /vagrant share will not be reloaded on file change.

#### Workaround 1

Use an alternative sync method such as RSYNC or [Vagrant Unison](https://github.com/mrdavidlaing/vagrant-unison)

#### Workaround 2

Configure your IDE/Text Editor to remote sync all files on change. WebStorm, for example, provides a facility where project files can be synced using SFTP.


### 6. Synchronize Project Files to Vagrant Box

Typically I create a **files** folder inside the vagrant home (/home/vagrant) folder and configure project files to be synchronized there.

Once synchronized, cd into ~/files and install all npm dependencies using:

```
npm install
```

Once all node dependencies are installed, start the development server using:

```
gulp
```

The development web application should now be accessible on [http://192.168.30.20:8080](http://192.168.30.20:8080).